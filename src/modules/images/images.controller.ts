import {
  Controller,
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
  constructor(private readonly imageService: ImagesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file) {
    const imageUrl = await this.imageService.uploadImage(file);
    return {
      image_url: imageUrl,
    };
  }
}
