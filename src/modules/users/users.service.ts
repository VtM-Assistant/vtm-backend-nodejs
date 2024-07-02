import { Injectable } from '@nestjs/common';
import { User } from 'src/entities';
import { UsersRepository } from '../repositories';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async findOne(username: string): Promise<User | undefined> {
    const users = await this.usersRepository.findAllUsers();

    return users.find((user) => user.username === username);
  }

  async createOne(user: User) {
    await this.usersRepository.createUser(user);
  }
}
