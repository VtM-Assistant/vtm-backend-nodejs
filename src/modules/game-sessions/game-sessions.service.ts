import { Injectable } from '@nestjs/common';
import { GameSessionsRepository } from '../repositories/game-sessions.repository';
import { GameSession } from 'src/entities';

@Injectable()
export class GameSessionsService {
  constructor(private gameSessionsRepository: GameSessionsRepository) {}

  async getAllUserSessions(userId: string): Promise<GameSession[]> {
    return this.gameSessionsRepository.findAllUserSessions(userId);
  }

  async create(options: {
    userId: string;
    name: string;
    description?: string;
  }): Promise<GameSession> {
    const session = new GameSession();
    session.name = options.name;
    session.description = options.description;
    session.characters = [];
    session.ownerId = options.userId;

    return this.gameSessionsRepository.createSession(session);
  }
}
