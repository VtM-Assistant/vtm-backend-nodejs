import { Controller, Get, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { ClansService } from './clans.service';

@Controller('clans')
export class ClansController {
  constructor(private clansService: ClansService) {}

  @Public()
  @Get()
  async getAll() {
    return await this.clansService.findAll();
  }

  @Post()
  async create() {
    await this.clansService.create('Brujah', 'The Best');
  }
}
