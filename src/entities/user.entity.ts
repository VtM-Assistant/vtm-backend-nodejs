import { hash } from 'src/utils/crypto.functions';
import { v4 as uuidv4 } from 'uuid';

import { RegisterDataDto } from 'src/modules/auth';
import { Role } from '.';

export class User {
  id: string;
  username: string;
  password: string;
  createdAt: Date;

  role: Role;

  static fromDynamoDBObject(data: any): User {
    const result = new User();
    result.id = data.id.S;
    result.username = data.username.S;
    result.password = data.password.S;
    result.role = Role[data.role.S as keyof typeof Role];

    result.createdAt = new Date(Number(data.createdAt.N));
    return result;
  }

  static create(username: string, password: string): User {
    const result = new User();

    result.id = uuidv4();
    result.username = username;
    result.password = hash(password);
    result.createdAt = new Date();
    result.role = Role.User;

    return result;
  }
}
