import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { FirebaseModule } from '../firebase';

@Module({
  imports: [FirebaseModule],
  providers: [ImagesService],
  controllers: [ImagesController],
})
export class ImagesModule {}
