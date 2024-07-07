import { Injectable } from '@nestjs/common';
import { Image } from 'src/entities';
import { DynamoFactory } from '../dynamo/dynamo.factory';

@Injectable()
export class ImagesRepository {
  constructor(private readonly dynamo: DynamoFactory) {}

  async createImage(image: Image): Promise<Image> {
    return this.dynamo.enitityManager.create<Image>(image);
  }

  async findAllImages(): Promise<Image[]> {
    return (await this.dynamo.scanManager.find(Image)).items;
  }

  async findImageById(id: string): Promise<Image> {
    return this.dynamo.enitityManager.findOne(Image, { id });
  }

  async updateImage(
    id: string,
    imageUrl: string,
    fileName: string,
  ): Promise<Image> {
    return this.dynamo.enitityManager.update<Image>(
      Image,
      { id },
      {
        imageUrl,
        fileName,
      },
    );
  }

  async deleteImage(id: string) {
    await this.dynamo.enitityManager.delete(Image, { id });
  }
}
