import {
  AUTO_GENERATE_ATTRIBUTE_STRATEGY,
  Attribute,
  AutoGenerateAttribute,
  Entity,
} from '@typedorm/common';

@Entity({
  name: 'session',
  primaryKey: {
    partitionKey: 'USER#{{ownerId}}',
    sortKey: 'SESSION#{{id}}',
  },
})
export class GameSession {
  @AutoGenerateAttribute({ strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.UUID4 })
  id: string;

  @Attribute()
  ownerId: string;

  @Attribute()
  name: string;

  @Attribute()
  description?: string;

  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.EPOCH_DATE,
  })
  createdAt: number;

  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.EPOCH_DATE,
    autoUpdate: true,
  })
  updatedAt: number;

  @Attribute()
  characters: string[];
}
