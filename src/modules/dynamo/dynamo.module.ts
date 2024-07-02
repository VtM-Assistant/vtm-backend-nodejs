import { Module } from '@nestjs/common';
import { DynamoRepository } from './';

@Module({
  exports: [DynamoRepository],
})
export class DynamoModule {}
