import {
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
  PureAbility,
  buildMongoQueryMatcher,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User, Role, Character } from 'src/entities';
import { Action } from './casl-actions';

type Subjects = InferSubjects<typeof Character> | 'all';

export type AppAbility = PureAbility<[Action, Subjects]>;

const conditionsMatcher = buildMongoQueryMatcher();

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, build, cannot } = new AbilityBuilder(
      PureAbility as AbilityClass<AppAbility>,
    );

    can(Action.Read, Character);
    cannot(Action.Read, Character, {
      userId: {
        $ne: user.id,
      },
      isPrivate: {
        $eq: true,
      },
    }).because('You can read only your or public characters');

    if (user.role === Role.Admin) {
      can(Action.Manage, 'all');
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
      conditionsMatcher,
    });
  }
}
