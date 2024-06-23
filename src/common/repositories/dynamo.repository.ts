import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { Injectable } from '@nestjs/common';
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
    //
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

  async findAllUsers() {
    const result = await this.scanManager.find(User);

    return result.items;
  }

  async createUser(user: User) {
    return this.enitityManager.create(user);
  }
}
