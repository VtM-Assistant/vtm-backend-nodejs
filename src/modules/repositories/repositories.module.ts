import { Module } from '@nestjs/common';
import { ClansRepository } from './clans.repository';
import { ImagesRepository } from './images.repository';
import { UsersRepository } from './users.repository';
import { DynamoModule } from '../dynamo/dynamo.module';
import { GameSessionsRepository } from './game-sessions.repository';
import { CharactersRepository } from './characters.repository';

@Module({
  imports: [DynamoModule],
  providers: [
    UsersRepository,
    ClansRepository,
    ImagesRepository,
    GameSessionsRepository,
    CharactersRepository,
  ],
  exports: [
    UsersRepository,
    ClansRepository,
    ImagesRepository,
    GameSessionsRepository,
    CharactersRepository,
  ],
})
export class RepositoriesModule {}
