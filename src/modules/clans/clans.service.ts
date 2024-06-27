import { Injectable } from '@nestjs/common';
import { Clan } from 'src/entities';
import { DynamoRepository } from '../dynamo';

@Injectable()
export class ClansService {
  constructor(private dynamoRepository: DynamoRepository) {}
  async findAll(): Promise<Clan[]> {
    return this.dynamoRepository.finalAllClans();
  }

  async create(name: string, description: string) {
    const clan = new Clan();
    clan.name = name;
    clan.description = description;

    return this.dynamoRepository.createClan(clan);
  }
}
