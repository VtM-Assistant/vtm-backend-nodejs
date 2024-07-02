import { Module } from '@nestjs/common';
import { ClansRepository } from './clans.repository';
import { ImagesRepository } from './images.repository';
import { UsersRepository } from './users.repository';
import { DynamoModule } from '../dynamo/dynamo.module';

@Module({
  imports: [DynamoModule],
  providers: [UsersRepository, ClansRepository, ImagesRepository],
  exports: [UsersRepository, ClansRepository, ImagesRepository],
})
export class RepositoriesModule {}
