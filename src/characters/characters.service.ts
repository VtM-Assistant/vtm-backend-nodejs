import { Injectable } from '@nestjs/common';
import { CharacterDto, CreateCharacterDto } from './dto';




@Injectable()
export class CharactersService {


    private characters: CharacterDto[] = [
        {
            id: 1,
            name: "Brujah",
            userId: 1,
        },
        {
            id: 2,
            name: "Gangrel",
            userId: 2,
        },
        {
            id: 3,
            name: "Tremere",
            userId: 3
        },
    ];


    async create(createCharacterDto: CreateCharacterDto) {
        // TODO: Create character

        console.log("CREATE CHARACTER");
    }

    async delete(id: number) {
        // TODO: Delete character

        console.log("DELETE CHARACTER")
    }

    async getAll(): Promise<CharacterDto[]> {
        // TODO: Read characters
        return this.characters;
    }

    async get(id: number): Promise<CharacterDto | null> {
        const character = this.characters.find((character) => character.id == id);
        // TODO: Get Character
        return character;
    }
}
