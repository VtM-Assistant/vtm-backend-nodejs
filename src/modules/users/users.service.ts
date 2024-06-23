import { Injectable } from '@nestjs/common';
import { User } from 'src/entities';
import { DynamoRepository } from '../dynamo';

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
