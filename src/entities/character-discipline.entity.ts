import { Attribute, Entity } from '@typedorm/common';

@Entity({
  name: 'character_discipline',
  primaryKey: {
    partitionKey: 'CHARACTER#{{ownerId}}',
    sortKey: 'DISCIPLINE#{{disciplineId}}',
  },
})
export class CharacterDiscipline {
  @Attribute()
  ownerId: string;

  @Attribute()
  disciplineId: string;

  @Attribute()
  value: number;

  // TODO: Extra_points
}
