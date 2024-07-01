import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import admin from 'firebase-admin';
import { Storage } from 'firebase-admin/lib/storage/storage';

@Injectable()
export class FirebaseService {
  private readonly storage: Storage;

  constructor(private readonly configService: ConfigService) {
    // this.configService.get<string>('JWT_SECRET');
    // const serviceAccount = require('../../../vtm-assistant-firebase-adminsdk-4d8xw-1007b84f41.json');

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

  getStorageInstance(): Storage {
    return this.storage;
  }
}
