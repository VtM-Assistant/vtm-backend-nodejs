import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { PoliciesGuard } from 'src/policies';
import { CaslAbilityFactory } from 'src/casl';

@Module({
  providers: [CharactersService, PoliciesGuard, CaslAbilityFactory],
  controllers: [CharactersController]
})
export class CharactersModule {}
