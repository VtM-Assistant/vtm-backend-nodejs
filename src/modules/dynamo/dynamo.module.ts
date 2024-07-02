import { Module } from '@nestjs/common';
import { DynamoFactory } from './dynamo.factory';

@Module({
  providers: [DynamoFactory],
  exports: [DynamoFactory],
})
export class DynamoModule {}
