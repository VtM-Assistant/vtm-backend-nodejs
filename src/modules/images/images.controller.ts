import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  Request,
  Patch,
} from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Public()
  @Get()
  async getAll() {
    return this.imagesService.getAll();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file, @Request() request) {
    const image = await this.imagesService.uploadImage(file, request.user);
    return image;
  }

  @Delete(':id')
  async delete(@Param() params: any) {
    await this.imagesService.delete(params.id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(@UploadedFile() file, @Param() params: any, @Request() request) {
    const image = await this.imagesService.update(params.id, file);
    return image;
  }
}
