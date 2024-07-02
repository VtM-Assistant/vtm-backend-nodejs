import {
  AUTO_GENERATE_ATTRIBUTE_STRATEGY,
  Attribute,
  AutoGenerateAttribute,
  Entity,
} from '@typedorm/common';

@Entity({
  name: 'discipline',
  primaryKey: {
    partitionKey: 'DISCIPLINE#{{id}}',
    sortKey: 'DETAILS',
  },
})
export class Discipline {
  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.UUID4,
  })
  id: string;

  @Attribute()
  name: string;

  @Attribute()
  description: string;

  // TODO: Extra points
}
