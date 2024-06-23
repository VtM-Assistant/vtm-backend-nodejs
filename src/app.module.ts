import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import {
  AuthModule,
  UsersModule,
  ClansModule,
  CharactersModule,
  DynamoModule,
} from './modules';
import { AuthGuard } from './common/guards';
import { CaslAbilityFactory } from './common/factories';
import { CaslExceptionFilter } from './common/filters';

@Module({
  imports: [
    DynamoModule,
    AuthModule,
    UsersModule,
    ClansModule,
    CharactersModule,
  ],
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
  // exports: [DynamoModule],
})
export class AppModule {}
