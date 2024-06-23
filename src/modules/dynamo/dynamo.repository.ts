import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { Injectable, Scope } from '@nestjs/common';
import { Table } from '@typedorm/common';
import {
  EntityManager,
  ScanManager,
  createConnection,
  getEntityManager,
  getScanManager,
} from '@typedorm/core';
import { DocumentClientV3 } from '@typedorm/document-client';
import { User } from 'src/entities';

const myGlobalTable = new Table({
  name: 'vtmr-assistant',
  partitionKey: 'PK',
  sortKey: 'SK',
});

@Injectable()
export class DynamoRepository {
  private readonly enitityManager: EntityManager;
  private readonly scanManager: ScanManager;

  constructor() {
    const documentClient = new DocumentClientV3(
      new DynamoDBClient({
        region: 'eu-central-1',
      }),
    );

    createConnection({
      table: myGlobalTable,
      entities: [User],
      documentClient,
    });

    this.enitityManager = getEntityManager();
    this.scanManager = getScanManager();
  }

  async findAllUsers(): Promise<User[]> {
    const result = await this.scanManager.find(User);

    return result.items;
  }

  async createUser(user: User): Promise<undefined> {
    return this.enitityManager.create(user);
  }

  async findUserById(id: string): Promise<User | undefined> {
    return this.enitityManager.findOne(User, { id });
  }

  async findUserByName(username: string): Promise<User | undefined> {
    // TODO: Rework with GSI
    const users = await this.scanManager.find(User);
    return users.items.find((user) => user.username === username);
  }
}
