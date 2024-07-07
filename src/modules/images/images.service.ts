import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Image, User } from 'src/entities';
import { ImagesRepository } from '../repositories/images.repository';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class ImagesService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly imagesRepository: ImagesRepository,
  ) {}

  async uploadImage(file: Express.Multer.File, user: User): Promise<Image> {
    // TODO: Add accesability

    const id = uuidv4();

    const fileName = `${id}_${file.originalname}`;

    const imageUrl = await this.firebaseService.uploadFile(fileName, file);

    const image = new Image();
    image.id = id;
    image.imageUrl = imageUrl;
    image.creatorId = user.id;
    image.fileName = fileName;

    return this.imagesRepository.createImage(image);
  }

  async getAll() {
    return this.imagesRepository.findAllImages();
  }

  async update(id: string, file: Express.Multer.File): Promise<Image> {
    // TODO: Add accesability

    const image = await this.imagesRepository.findImageById(id);

    await this.firebaseService.deleteFile(image.fileName);

    const newFileName = `${id}_${file.originalname}`;

    const imageUrl = await this.firebaseService.uploadFile(newFileName, file);

    return this.imagesRepository.updateImage(id, imageUrl, newFileName);
  }

  async delete(id: string) {
    // TODO: Add accesability

    const image = await this.imagesRepository.findImageById(id);

    await this.firebaseService.deleteFile(image.fileName);

    await this.imagesRepository.deleteImage(id);
  }
}
