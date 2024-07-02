import { Injectable } from '@nestjs/common';
import { DynamoFactory } from '../dynamo/dynamo.factory';
import { Character, GameSession } from 'src/entities';

@Injectable()
export class GameSessionsRepository {
  constructor(private readonly dynamo: DynamoFactory) {}

  async findAllUserSessions(userId: string): Promise<GameSession[]> {
    const sessions = await this.dynamo.enitityManager.find(
      GameSession,
      { ownerId: userId },
      {
        keyCondition: {
          BEGINS_WITH: 'SESSION#',
        },
      },
    );

    return sessions.items;
  }

  async createSession(session: GameSession): Promise<GameSession> {
    return this.dynamo.enitityManager.create(session);
  }

  async addCharacterToSession(
    id: string,
    character: Character,
  ): Promise<GameSession> {
    return this.dynamo.enitityManager.update(
      GameSession,
      { id },
      {
        characters: {
          ADD: [character.id],
        },
      },
    );
  }
}
