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

  // TODO: Update image

  async deleteImage(id: string) {
    await this.dynamo.enitityManager.delete(Image, { id });
  }
}
