import { Injectable } from '@nestjs/common';
import { Clan } from 'src/entities';
import { DynamoFactory } from '../dynamo/dynamo.factory';

@Injectable()
export class ClansRepository {
  constructor(private readonly dynamo: DynamoFactory) {}

  async finalAllClans(): Promise<Clan[]> {
    return (await this.dynamo.scanManager.find(Clan)).items;
  }

  async createClan(clan: Clan) {
    return this.dynamo.enitityManager.create(clan);
  }
}
