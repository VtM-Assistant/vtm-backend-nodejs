import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DynamoModule } from '../dynamo';

@Module({
  imports: [DynamoModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
