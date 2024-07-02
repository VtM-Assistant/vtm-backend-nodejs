import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { FirebaseModule } from '../firebase';
import { RepositoriesModule } from '../repositories';

@Module({
  imports: [FirebaseModule, RepositoriesModule],
  providers: [ImagesService],
  controllers: [ImagesController],
})
export class ImagesModule {}
