import { Injectable } from '@nestjs/common';
import { DynamoRepository } from 'src/common/repositories';
import { User, Role } from 'src/entities';

// export type User = any;

@Injectable()
export class UsersService {
  constructor(private dynamoRepository: DynamoRepository) {}

  async findOne(username: string): Promise<User | undefined> {
    const users = await this.dynamoRepository.findAllUsers();

    return users.find((user) => user.username === username);
  }

  async createOne(user: User) {
    await this.dynamoRepository.createUser(user);
  }

}
