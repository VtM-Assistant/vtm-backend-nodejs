import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase';
import { v4 as uuidv4 } from 'uuid';
import { Image, User } from 'src/entities';
import { ImagesRepository } from '../repositories';

@Injectable()
export class ImagesService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly imagesRepository: ImagesRepository,
  ) {}

  async uploadImage(file: Express.Multer.File, user: User): Promise<Image> {
    // TODO: Add accesability
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
    image.creatorId = user.id;

    return this.imagesRepository.createImage(image);
  }

  async getAll() {
    return this.imagesRepository.findAllImages();
  }

  async update(id: string) {
    // TODO: Add accesability
    // TODO: Update image on storage
    // TODO: Update image in DB
  }

  async delete(id: string) {
    const image = await this.imagesRepository.findImageById(id);

    console.log(image);

    return;

    // TODO: Add accesability

    // TODO: Delete image from storage

    await this.imagesRepository.deleteImage(id);
  }
}
