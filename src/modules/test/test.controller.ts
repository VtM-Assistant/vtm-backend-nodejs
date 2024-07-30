import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/common/decorators';

@Public()
@Controller('test')
export class TestController {
  @Get()
  test() {
    return { message: 'ASD' };
  }
}
