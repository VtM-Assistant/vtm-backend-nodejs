import {
  AttributeValue,
  DynamoDBClient,
  PutItemCommand,
  ScanCommand,
} from '@aws-sdk/client-dynamodb';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities';

@Injectable()
export class DynamoRepository {
  private readonly tableName = 'vtmr-assistant';
  private readonly client: DynamoDBClient;

  constructor() {
    this.client = new DynamoDBClient({
      region: 'eu-central-1',
    });
  }

  async findAllUsers() {
    const result: User[] = [];
    const command = new ScanCommand({
      TableName: this.tableName,
    });

    const response = await this.client.send(command);

    if (response.Items) {
      response.Items.forEach((item) => {
        result.push(User.fromDynamoDBObject(item));
      });
    }

    return result;
  }

  async createUser(data: User) {
    const itemObject: Record<string, AttributeValue> = {
      PK: {
        S: `USER#${data.id}`,
      },
      SK: {
        S: 'PROFILE',
      },
      id: {
        S: data.id,
      },
      username: {
        S: data.username,
      },
      password: {
        S: data.password,
      },
      createdAt: {
        S: String(data.createdAt.getTime()),
      },
      role: {
        S: data.role.toString(),
      },
    };

    const command = new PutItemCommand({
      TableName: this.tableName,

      Item: itemObject,
    });

    await this.client.send(command);
  }
}
