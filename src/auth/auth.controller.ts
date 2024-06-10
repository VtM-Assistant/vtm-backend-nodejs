import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { LoginDataDto } from './dto';
import { AuthService } from './auth.service';
import { Public } from 'src/public/public.decorator';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }



    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: LoginDataDto) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('register')
    register() {
        // TODO: Create new user
        return {
            "message": "ASD"
        };
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    profile(@Request() req) {
        return req.user;
    }
}
