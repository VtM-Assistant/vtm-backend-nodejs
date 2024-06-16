import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AuthModule } from './modules/auth';
import { UsersModule } from './modules/users';
import { ClansModule } from './modules/clans';
import { AuthGuard } from './common/guards';
import { CharactersModule } from './modules/characters';
import { CaslAbilityFactory } from './common/factories';
import { CaslExceptionFilter } from './common/filters';

@Module({
  imports: [AuthModule, UsersModule, ClansModule, CharactersModule],
  providers: [
    CaslAbilityFactory,
    {
      provide: APP_FILTER,
      useClass: CaslExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [],
})
export class AppModule {}
