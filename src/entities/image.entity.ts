import {
  AUTO_GENERATE_ATTRIBUTE_STRATEGY,
  Attribute,
  AutoGenerateAttribute,
  Entity,
  INDEX_TYPE,
} from '@typedorm/common';

@Entity({
  name: 'image',
  primaryKey: {
    partitionKey: 'IMAGE${{id}}',
    sortKey: 'DETAILS',
  },
  indexes: {
    GSI1: {
      type: INDEX_TYPE.GSI,
      partitionKey: 'CREATOR#{{creatorId}}',
      sortKey: 'SK',
    },
  },
})
export class Image {
  @Attribute()
  id: string;

  @Attribute()
  creatorId: string;

  @Attribute()
  imageUrl: string;

  @Attribute()
  fileName: string;

  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.EPOCH_DATE,
  })
  createdAt: number;

  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.EPOCH_DATE,
    autoUpdate: true,
  })
  updatedAt: number;
}
