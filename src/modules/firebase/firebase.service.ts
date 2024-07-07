import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import admin from 'firebase-admin';
import { Storage } from 'firebase-admin/lib/storage/storage';

@Injectable()
export class FirebaseService {
  private readonly storage: Storage;

  constructor(private readonly configService: ConfigService) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
        clientEmail: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
        privateKey: configService
          .get<string>('FIREBASE_PRIVATE_KEY')
          .replace(/\\n/g, '\n'),
      }),
      storageBucket: configService.get<string>('FIREBASE_STORAGE_BUCKET'),
    });

    this.storage = admin.storage();
  }

  async uploadFile(
    fileName: string,
    file: Express.Multer.File,
  ): Promise<string> {
    const bucket = this.storage.bucket();

    const cloudFile = bucket.file(fileName);

    const stream = cloudFile.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    return new Promise<string>((resolve, reject) => {
      stream.on('error', (error) => {
        reject(error);
      });

      stream.on('finish', async () => {
        try {
          await cloudFile.makePublic();
          const imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
          resolve(imageUrl);
        } catch (error) {
          reject(error);
        }
      });

      stream.end(file.buffer);
    });
  }

  async deleteFile(fileName: string) {
    return this.storage.bucket().file(fileName).delete();
  }
}
