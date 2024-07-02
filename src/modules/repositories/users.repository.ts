import { Injectable } from '@nestjs/common';
import { User } from 'src/entities';
import { DynamoFactory } from '../dynamo/dynamo.factory';

@Injectable()
export class UsersRepository {
  constructor(private readonly dynamo: DynamoFactory) {}

  async findAllUsers(): Promise<User[]> {
    return (await this.dynamo.scanManager.find(User)).items;
  }

  async createUser(user: User): Promise<undefined> {
    return this.dynamo.enitityManager.create(user);
  }

  async findUserById(id: string): Promise<User | undefined> {
    return this.dynamo.enitityManager.findOne(User, { id });
  }

  async findUserByName(username: string): Promise<User | undefined> {
    const users = await this.dynamo.enitityManager.find(
      User,
      {
        username,
      },
      {
        queryIndex: 'GSI1',
      },
    );

    if (users.items.length > 0) {
      return users.items[0];
    }
    return undefined;
  }
}
