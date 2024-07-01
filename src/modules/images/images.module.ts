import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { FirebaseModule } from '../firebase';
import { DynamoModule } from '../dynamo';

@Module({
  imports: [FirebaseModule, DynamoModule],
  providers: [ImagesService],
  controllers: [ImagesController],
})
export class ImagesModule {}
