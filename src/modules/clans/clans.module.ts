import { Module } from '@nestjs/common';
import { ClansController } from './clans.controller';
import { ClansService } from './clans.service';
import { DynamoModule } from '../dynamo';

@Module({
  imports: [DynamoModule],
  controllers: [ClansController],
  providers: [ClansService],
})
export class ClansModule {}
