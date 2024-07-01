import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase';
import { Express } from 'express';

@Injectable()
export class ImagesService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async uploadImage(file: Express.Multer.File): Promise<string> {
    const storage = this.firebaseService.getStorageInstance();
    const bucket = storage.bucket();

    const fileName = `${Date.now()}_${file.originalname}`;
    const fileUpload = bucket.file(fileName);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    return new Promise((resolve, reject) => {
      stream.on('error', (error) => {
        reject(error);
      });

      stream.on('finish', async () => {
        try {
          await fileUpload.makePublic();
          const imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
          resolve(imageUrl);
        } catch (error) {
          reject(error);
        }
      });

      stream.end(file.buffer);
    });
  }
}
