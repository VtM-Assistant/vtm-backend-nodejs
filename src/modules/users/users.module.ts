import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DynamoRepository } from 'src/common/repositories';

@Module({
  providers: [UsersService, DynamoRepository],
  exports: [UsersService],
})
export class UsersModule {}
