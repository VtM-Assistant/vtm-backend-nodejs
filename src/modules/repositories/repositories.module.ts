import { Module } from '@nestjs/common';
import { ImagesRepository, UsersRepository, ClansRepository } from './';
import { DynamoModule } from '../dynamo';

@Module({
  imports: [DynamoModule],
  exports: [UsersRepository, ClansRepository, ImagesRepository],
})
export class RepositoriesModule {}
