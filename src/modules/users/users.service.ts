import { Injectable } from '@nestjs/common';
import { User, Role } from 'src/entities';

// export type User = any;

@Injectable()
export class UsersService {
  // TODO: Move Users to DB
  private readonly users: User[] = [
    {
      id: 1,
      username: 'admin',
      password: 'admin',
      role: Role.Admin,
    },
    {
      id: 2,
      username: '2',
      password: '2',
      role: Role.User,
    },
    {
      id: 3,
      username: '3',
      password: '3',
      role: Role.User,
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
