import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guards';
import { CaslAbilityFactory } from './common/factories';
import { CaslExceptionFilter } from './common/filters';
import { RepositoriesModule } from './modules/repositories/repositories.module';
import { DynamoModule } from './modules/dynamo/dynamo.module';
import { AuthModule } from './modules/auth/auth.module';
import { CharactersModule } from './modules/characters/characters.module';
import { ClansModule } from './modules/clans/clans.module';
import { FirebaseModule } from './modules/firebase/firebase.module';
import { ImagesModule } from './modules/images/images.module';
import { UsersModule } from './modules/users/users.module';
import { GameSessionsModule } from './modules/game-sessions/game-sessions.module';


@Module({
  imports: [
    FirebaseModule,
    DynamoModule,
    RepositoriesModule,
    AuthModule,
    UsersModule,
    ClansModule,
    CharactersModule,
    ImagesModule,
    GameSessionsModule,
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
