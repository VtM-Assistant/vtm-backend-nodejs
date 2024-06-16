import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto';
import { Character, User } from 'src/entities';
import { ForbiddenError } from '@casl/ability';
import { Action, CaslAbilityFactory } from 'src/common/factories';

@Injectable()
export class CharactersService {
  constructor(private caslAbilityFactory: CaslAbilityFactory) {
    // TODO: Move characters to DB
    this.characters = [new Character(), new Character(), new Character()];

    this.characters[0].id = 1;
    this.characters[0].name = '1';
    this.characters[0].userId = 1;
    this.characters[0].isPrivate = true;

    this.characters[1].id = 2;
    this.characters[1].name = '2';
    this.characters[1].userId = 2;
    this.characters[1].isPrivate = true;

    this.characters[2].id = 3;
    this.characters[2].name = '3';
    this.characters[2].userId = 3;
    this.characters[2].isPrivate = false;
  }

  private characters: Character[];

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
    return this.characters;
  }

  async get(id: number, user: User): Promise<Character | null> {
    const character = this.characters.find((character) => character.id == id);

    if (!character) {
      return null;
    }

    const ability = this.caslAbilityFactory.createForUser(user);

    ForbiddenError.from(ability).throwUnlessCan(Action.Read, character);

    return character;
  }
}
