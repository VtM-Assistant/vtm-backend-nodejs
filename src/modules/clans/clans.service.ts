import { Injectable } from '@nestjs/common';
import { Clan } from 'src/entities';
import { ClansRepository } from '../repositories/clans.repository';

@Injectable()
export class ClansService {
  constructor(private clansRepository: ClansRepository) {}
  async findAll(): Promise<Clan[]> {
    return this.clansRepository.finalAllClans();
  }

  async create(name: string, description: string) {
    const clan = new Clan();
    clan.name = name;
    clan.description = description;

    return this.clansRepository.createClan(clan);
  }
}
