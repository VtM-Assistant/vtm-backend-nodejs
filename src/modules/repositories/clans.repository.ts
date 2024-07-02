import { Injectable } from '@nestjs/common';
import { Clan } from 'src/entities';

@Injectable()
export class ClansRepository {
  /// Clans

  async finalAllClans(): Promise<Clan[]> {
    throw new Error();
    // return (await this.scanManager.find(Clan)).items;
  }

  async createClan(clan: Clan) {
    // return this.enitityManager.create(clan);
  }
}
