import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { CaslAbilityFactory } from 'src/common/factories/casl';
import { PoliciesGuard } from 'src/common/guards';

@Module({
  providers: [CharactersService, PoliciesGuard, CaslAbilityFactory],
  controllers: [CharactersController],
})
export class CharactersModule {}
