import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { RepositoriesModule } from '../repositories/repositories.module';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [FirebaseModule, RepositoriesModule],
  providers: [ImagesService],
  controllers: [ImagesController],
})
export class ImagesModule {}
