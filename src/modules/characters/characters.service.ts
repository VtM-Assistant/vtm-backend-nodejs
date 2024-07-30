import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto';
import { Character, User } from 'src/entities';
import { ForbiddenError } from '@casl/ability';
import { Action, CaslAbilityFactory } from 'src/common/factories';
import { CharactersRepository } from '../repositories/characters.repository';
import { ClansRepository } from '../repositories/clans.repository';

@Injectable()
export class CharactersService {
  constructor(
    private caslAbilityFactory: CaslAbilityFactory,
    private charactersRepository: CharactersRepository,
    private clansRepository: ClansRepository,
  ) {}

  async create(
    createCharacterDto: CreateCharacterDto,
    userId: string,
  ): Promise<Character> {
    const character = new Character();
    character.name = createCharacterDto.name;
    character.disciplines = [];
    character.userId = userId;
    character.clanId = createCharacterDto.clanId;
    character.isPrivate = createCharacterDto.isPrivate;

    return this.charactersRepository.createCharacter(character);
  }

  async delete(id: number) {
    // TODO: Delete character

    console.log('DELETE CHARACTER');
  }

  async getAll(): Promise<Character[]> {
    // TODO: Read characters
    throw new Error('Unimplemented');
  }

  async getUserCharacters(userId: string): Promise<Character[]> {
    const clansArr = await this.clansRepository.finalAllClans();
    console.log(clansArr);

    const clans = clansArr.reduce<{}>(
      (accumulator, currentValue, index, array) => {
        accumulator[currentValue.id] = currentValue;
        return accumulator;
      },
      {},
    );

    const characters =
      await this.charactersRepository.findAllUserCharacters(userId);

    console.log(clans);

    return this.charactersRepository.findAllUserCharacters(userId);
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
