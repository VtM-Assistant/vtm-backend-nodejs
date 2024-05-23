import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/public/public.decorator';

@Public()
@Controller('clans')
export class ClansController {
    @Get()
    getAll() {
        return [];
    }
}
