import { Module } from '@nestjs/common';
import { ClansController } from './clans.controller';
import { ClansService } from './clans.service';
import { RepositoriesModule } from '../repositories/repositories.module';

@Module({
  imports: [RepositoriesModule],
  controllers: [ClansController],
  providers: [ClansService],
})
export class ClansModule {}
