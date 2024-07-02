import { Injectable } from '@nestjs/common';
import { Image } from 'src/entities';

@Injectable()
export class ImagesRepository {
  /// Images

  async createImage(image: Image): Promise<Image> {
    throw new Error();
    // return this.enitityManager.create<Image>(image);
  }

  async findAllImages(): Promise<Image[]> {
    throw new Error();
    // return (await this.scanManager.find(Image)).items;
  }

  async findImageById(id: string): Promise<Image> {
    throw new Error();

    // return this.enitityManager.findOne(Image, { id });
  }

  // TODO: Update image

  async deleteImage(id: string) {
    // await this.enitityManager.delete(Image, { id });
  }
}
