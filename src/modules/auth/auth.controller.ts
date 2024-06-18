import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LoginDataDto, RegisterDataDto } from './dto';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators';
import { AuthGuard } from 'src/common/guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() loginData: LoginDataDto) {
    return this.authService.signIn(loginData.username, loginData.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  singUp(@Body() registerData: RegisterDataDto) {
    return this.authService.signUp(
      registerData.username,
      registerData.password,
    );
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  profile(@Request() req) {
    return req.user;
  }
}
