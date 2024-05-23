import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginData } from './dto';
import { AuthService } from './auth.service';
import { Public } from 'src/public/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: LoginData) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @Post('register')
    register() {
        // TODO: Create new user
        return {
            "message": "ASD"
        };
    }
}
