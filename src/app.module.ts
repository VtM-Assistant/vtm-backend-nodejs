import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import {
  AuthModule,
  UsersModule,
  ClansModule,
  CharactersModule,
  DynamoModule,
  ImagesModule,
  FirebaseModule,
} from './modules';
import { AuthGuard } from './common/guards';
import { CaslAbilityFactory } from './common/factories';
import { CaslExceptionFilter } from './common/filters';
import { RepositoriesModule } from './modules/repositories/repositories.module';

@Module({
  imports: [
    DynamoModule,
    RepositoriesModule,
    AuthModule,
    UsersModule,
    ClansModule,
    CharactersModule,
    FirebaseModule,
    ImagesModule,
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
})
export class AppModule {}
