import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase';
import { DynamoRepository } from '../dynamo';
import { v4 as uuidv4 } from 'uuid';
import { Image } from 'src/entities';

@Injectable()
export class ImagesService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly dynamoRepository: DynamoRepository,
  ) {}

  async uploadImage(file: Express.Multer.File): Promise<Image> {
    const storage = this.firebaseService.getStorageInstance();
    const bucket = storage.bucket();

    const id = uuidv4();

    const fileName = `${id}_${file.originalname}`;
    const fileUpload = bucket.file(fileName);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    const imageUrl = await new Promise<string>((resolve, reject) => {
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

    const image = new Image();
    image.id = id;
    image.imageUrl = imageUrl;

    return this.dynamoRepository.createImage(image);
  }

  async getAll() {
    return this.dynamoRepository.findAllImages();
  }

  async update(id: string) {
    // TODO: Update image on storage
    // TODO: Update image in DB
  }

  async delete(id: string) {
    // TODO: Delete image from storage
    // TODO: Delete image from DB
  }
}
