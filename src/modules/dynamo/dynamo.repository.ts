import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { Injectable, Scope } from '@nestjs/common';
import { INDEX_TYPE, Table } from '@typedorm/common';
import {
  EntityManager,
  ScanManager,
  createConnection,
  getEntityManager,
  getScanManager,
} from '@typedorm/core';
import { DocumentClientV3 } from '@typedorm/document-client';
import { find } from 'rxjs';
import { Character, Clan, Image, User } from 'src/entities';

const myGlobalTable = new Table({
  name: 'vtmr-assistant',
  partitionKey: 'PK',
  sortKey: 'SK',
  indexes: {
    GSI1: {
      type: INDEX_TYPE.GSI,
      partitionKey: 'GSI1PK',
      sortKey: 'GSI1SK',
    },
  },
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
      entities: [User, Clan, Character, Image],
      documentClient,
    });

    this.enitityManager = getEntityManager();
    this.scanManager = getScanManager();
  }

  /// Users

  async findAllUsers(): Promise<User[]> {
    return (await this.scanManager.find(User)).items;
  }

  async createUser(user: User): Promise<undefined> {
    return this.enitityManager.create(user);
  }

  async findUserById(id: string): Promise<User | undefined> {
    return this.enitityManager.findOne(User, { id });
  }

  async findUserByName(username: string): Promise<User | undefined> {
    const users = await this.enitityManager.find(
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

  /// Clans

  async finalAllClans(): Promise<Clan[]> {
    return (await this.scanManager.find(Clan)).items;
  }

  async createClan(clan: Clan) {
    return this.enitityManager.create(clan);
  }

  /// Images

  async createImage(image: Image) {
    return this.enitityManager.create<Image>(image);
  }

  async findAllImages(): Promise<Image[]> {
    return (await this.scanManager.find(Image)).items;
  }
}
