import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character-dto';
import { CharactersService } from './characters.service';
import { CheckPolicies, PoliciesGuard } from 'src/policies';
import { Action, AppAbility } from 'src/casl';
import { CharacterDto } from './dto';

@Controller('characters')
export class CharactersController {

    constructor(private charactersService: CharactersService) { }


    @Post()
    create(@Body() createCharacterDto: CreateCharacterDto) {
        this.charactersService.create(createCharacterDto);
    }


    @Get(':id')
    @UseGuards(PoliciesGuard)
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, CharacterDto))
    get(@Param() params: any) {
        return this.charactersService.get(params.id);
    }

    @Get()
    @UseGuards(PoliciesGuard)
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, CharacterDto))
    getAll() {
        return this.charactersService.getAll();
    }


}
