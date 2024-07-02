import { Injectable } from '@nestjs/common';
import { DynamoRepository } from '../dynamo';
import { User } from 'src/entities';

@Injectable()
export class UsersRepository {
  constructor(/* private readonly dynamo: DynamoRepository */) {}

  async findAllUsers(): Promise<User[]> {
    return [];
    // return (await this.dynamo.scanManager.find(User)).items;
  }

  async createUser(user: User): Promise<undefined> {
    throw new Error('');
    // return this.dynamo.enitityManager.create(user);
  }

  async findUserById(id: string): Promise<User | undefined> {
    throw new Error('');

    // return this.dynamo.enitityManager.findOne(User, { id });
  }

  async findUserByName(username: string): Promise<User | undefined> {
    throw new Error('');

    // const users = await this.dynamo.enitityManager.find(
    //   User,
    //   {
    //     username,
    //   },
    //   {
    //     queryIndex: 'GSI1',
    //   },
    // );

    // if (users.items.length > 0) {
    //   return users.items[0];
    // }
    // return undefined;
  }
}
