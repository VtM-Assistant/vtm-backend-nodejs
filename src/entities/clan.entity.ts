import {
  AUTO_GENERATE_ATTRIBUTE_STRATEGY,
  Attribute,
  AutoGenerateAttribute,
  Entity,
} from '@typedorm/common';

@Entity({
  name: 'clan',
  primaryKey: {
    partitionKey: 'CLAN#{{id}}',
    sortKey: 'DETAILS',
  },
})
export class Clan {
  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.UUID4,
  })
  id: string;

  @Attribute()
  name: string;

  @Attribute()
  description: string;

  // TODO: Logo path
}
