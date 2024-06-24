import { hash } from 'src/utils/crypto.functions';
// import { v4 as uuidv4 } from 'uuid';
import {
  AUTO_GENERATE_ATTRIBUTE_STRATEGY,
  Attribute,
  AutoGenerateAttribute,
  Entity,
  INDEX_TYPE,
} from '@typedorm/common';

import { RegisterDataDto } from 'src/modules/auth';
import { Role } from '.';

@Entity({
  name: 'user',
  primaryKey: {
    partitionKey: 'USER#{{id}}',
    sortKey: 'PROFILE',
  },
  indexes: {
    GSI1: {
      type: INDEX_TYPE.GSI,
      partitionKey: 'USERNAME#{{username}}',
      sortKey: 'SK',
    },
  },
})
export class User {
  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.UUID4,
  })
  id: string;

  @Attribute()
  username: string;

  @Attribute()
  password: string;

  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.EPOCH_DATE,
  })
  createdAt: number;

  @Attribute({
    isEnum: true,
  })
  role: Role;

  static create(username: string, password: string): User {
    const result = new User();

    // result.id = uuidv4();
    result.username = username;
    result.password = hash(password);
    // result.createdAt = new Date();
    result.role = Role.User;

    return result;
  }
}
