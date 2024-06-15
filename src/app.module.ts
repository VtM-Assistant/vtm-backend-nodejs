import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './modules/auth';
import { UsersModule } from './modules/users';
import { ClansModule } from './modules/clans';
import { AuthGuard } from './common/guards';
import { CharactersModule } from './modules/characters';
import { CaslAbilityFactory } from './common/factories';

@Module({
  imports: [AuthModule, UsersModule, ClansModule, CharactersModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    CaslAbilityFactory,
  ],
  controllers: [],
})
export class AppModule {}
