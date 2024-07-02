import { Module } from '@nestjs/common';
import { ClansRepository } from './clans.repository';
import { ImagesRepository } from './images.repository';
import { UsersRepository } from './users.repository';
import { DynamoModule } from '../dynamo/dynamo.module';
import { GameSessionsRepository } from './game-sessions.repository';

@Module({
  imports: [DynamoModule],
  providers: [
    UsersRepository,
    ClansRepository,
    ImagesRepository,
    GameSessionsRepository,
  ],
  exports: [
    UsersRepository,
    ClansRepository,
    ImagesRepository,
    GameSessionsRepository,
  ],
})
export class RepositoriesModule {}
