import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities';
import { hash } from 'src/utils/crypto.functions';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersRepository: UsersRepository,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersRepository.findUserByName(username);

    if (user?.password !== hash(password)) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.id, username: user.username, role: user.role };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(username: string, password: string) {
    const user = await this.usersRepository.findUserByName(username);

    if (user) {
      throw new ConflictException('User with that name already exists');
    }

    const passwordValidation = this.isValidPassword(password);

    if (passwordValidation !== true) {
      throw new BadRequestException(passwordValidation);
    }

    const newUser = User.create(username, password);

    await this.usersRepository.createUser(newUser);
  }

  private isValidPassword(password: string): boolean | string {
    // TODO: Password validation. If not valid return message

    return true;
  }
}
