import { Global, Module } from '@nestjs/common';
import { DynamoRepository } from './dynamo.repository';

@Module({
  providers: [DynamoRepository],
  exports: [DynamoRepository],
})
export class DynamoModule {}
