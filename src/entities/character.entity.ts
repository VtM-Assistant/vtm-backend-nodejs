import {
  AUTO_GENERATE_ATTRIBUTE_STRATEGY,
  Attribute,
  AutoGenerateAttribute,
  Entity,
} from '@typedorm/common';

@Entity({
  name: 'character',
  primaryKey: {
    partitionKey: 'USER#{{userId}}',
    sortKey: 'CHARACTER#{{id}}',
  },
})
export class Character {
  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.UUID4,
  })
  id: string;

  @Attribute()
  name: string;

  @Attribute()
  userId: string;

  @Attribute()
  isPrivate: boolean = true;

  @Attribute()
  clanId: string;

  //TODO: generation

  //TODO: description

  //TODO: character image
}
