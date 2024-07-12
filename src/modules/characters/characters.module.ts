import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { CaslAbilityFactory } from 'src/common/factories/casl';
import { PoliciesGuard } from 'src/common/guards';
import { RepositoriesModule } from '../repositories/repositories.module';

@Module({
  imports: [RepositoriesModule],
  providers: [CharactersService, PoliciesGuard, CaslAbilityFactory],
  controllers: [CharactersController],
})
export class CharactersModule {}
