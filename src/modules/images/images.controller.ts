import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Public()
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get()
  async getAll() {
    return this.imagesService.getAll();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file) {
    const image = await this.imagesService.uploadImage(file);
    return image;
  }

  // TODO: Delete image

  // TODO: Update image
}
