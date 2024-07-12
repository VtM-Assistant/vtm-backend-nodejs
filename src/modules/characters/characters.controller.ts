import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Request,
} from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { CharactersService } from './characters.service';

@Controller('characters')
export class CharactersController {
  constructor(private charactersService: CharactersService) {}

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto, @Request() request) {
    return this.charactersService.create(createCharacterDto, request.user.id);
  }

  @Get(':id')
  async get(@Param() params: any, @Request() request) {
    const character = await this.charactersService.get(params.id, request.user);

    if (!character) {
      throw new NotFoundException();
    }
    return character;
  }

  @Get()
  // @UseGuards(PoliciesGuard)
  // @CheckPolicies((ability: AppAbility) =>
  //   ability.can(Action.Read, Character),
  // )
  getAll(@Request() request) {
    return this.charactersService.getUserCharacters(request.user.id);
  }
}
