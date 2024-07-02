import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { GameSessionsService } from './game-sessions.service';
import { CreateGameSessionDto } from './dto';

@Controller('game-sessions')
export class GameSessionsController {
  constructor(private readonly gameSessionsService: GameSessionsService) {}

  @Get()
  async getCharacterSession(@Request() request) {
    return this.gameSessionsService.getAllUserSessions(request.user.id);
  }

  @Post()
  async createSession(
    @Body() createGameSessionDto: CreateGameSessionDto,
    @Request() req,
  ) {
    return this.gameSessionsService.create({
      name: createGameSessionDto.name,
      userId: req.user.id,
      description: createGameSessionDto.description,
    });
  }
}
