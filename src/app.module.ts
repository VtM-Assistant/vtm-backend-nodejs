import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ClansModule } from './clans/clans.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { RolesModule } from './roles/roles.module';
import { CharactersModule } from './characters/characters.module';
import { RolesGuard } from './roles/roles.guard';
import { CaslModule } from './casl/casl.module';
import { PoliciesModule } from './policies/policies.module';

@Module({
  imports: [
    AuthModule, UsersModule, ClansModule, RolesModule, CharactersModule, CaslModule, PoliciesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
})
export class AppModule { }
