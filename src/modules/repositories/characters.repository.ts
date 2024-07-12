import { Injectable } from '@nestjs/common';
import { Character } from 'src/entities';
import { DynamoFactory } from '../dynamo/dynamo.factory';

@Injectable()
export class CharactersRepository {
  constructor(private readonly dynamo: DynamoFactory) {}

  async createCharacter(character: Character): Promise<Character> {
    return this.dynamo.enitityManager.create(character);
  }

  async findAllUserCharacters(userId: string): Promise<Character[]> {
    return (
      await this.dynamo.enitityManager.find(
        Character,
        { userId },
        {
          keyCondition: {
            BEGINS_WITH: 'CHARACTER#',
          },
        },
      )
    ).items;
  }
}
