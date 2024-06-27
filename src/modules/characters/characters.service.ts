import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto';
import { Character, User } from 'src/entities';
import { ForbiddenError } from '@casl/ability';
import { Action, CaslAbilityFactory } from 'src/common/factories';

@Injectable()
export class CharactersService {
  constructor(private caslAbilityFactory: CaslAbilityFactory) {}

  async create(createCharacterDto: CreateCharacterDto) {
    // TODO: Create character

    console.log('CREATE CHARACTER');
  }

  async delete(id: number) {
    // TODO: Delete character

    console.log('DELETE CHARACTER');
  }

  async getAll(): Promise<Character[]> {
    // TODO: Read characters
    throw new Error('Unimplemented');
  }

  async get(id: number, user: User): Promise<Character | null> {
    throw new Error('Unimplemented');

    /*     const character = this.characters.find((character) => character.id == id);

    if (!character) {
      return null;
    }

    const ability = this.caslAbilityFactory.createForUser(user);

    ForbiddenError.from(ability).throwUnlessCan(Action.Read, character);

    return character; */
  }
}
