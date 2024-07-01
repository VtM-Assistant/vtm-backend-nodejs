import {
  AUTO_GENERATE_ATTRIBUTE_STRATEGY,
  Attribute,
  AutoGenerateAttribute,
  Entity,
} from '@typedorm/common';

@Entity({
  name: 'image',
  primaryKey: {
    partitionKey: 'IMAGE${{id}}',
    sortKey: 'DETAILS',
  },
})
export class Image {
  @Attribute()
  id: string;

  @Attribute()
  imageUrl: string;

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
