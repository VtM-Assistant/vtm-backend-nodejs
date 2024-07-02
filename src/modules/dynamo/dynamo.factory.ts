import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { Injectable } from '@nestjs/common';
import { INDEX_TYPE, Table } from '@typedorm/common';
import {
  EntityManager,
  ScanManager,
  createConnection,
  getEntityManager,
  getScanManager,
} from '@typedorm/core';
import { DocumentClientV3 } from '@typedorm/document-client';
import {
  Character,
  CharacterDiscipline,
  Clan,
  Discipline,
  GameSession,
  Image,
  User,
} from 'src/entities';

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
export class DynamoFactory {
  readonly enitityManager: EntityManager;
  readonly scanManager: ScanManager;

  constructor() {
    const documentClient = new DocumentClientV3(
      new DynamoDBClient({
        region: 'eu-central-1',
      }),
    );

    createConnection({
      table: myGlobalTable,
      entities: [
        User,
        GameSession,
        Clan,
        Character,
        Image,
        Discipline,
        CharacterDiscipline,
      ],
      documentClient,
    });

    this.enitityManager = getEntityManager();
    this.scanManager = getScanManager();
  }
}
