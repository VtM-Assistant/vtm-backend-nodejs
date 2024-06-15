import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/common/decorators';

@Public()
@Controller('clans')
export class ClansController {
  @Get()
  getAll() {
    return [];
  }
}
