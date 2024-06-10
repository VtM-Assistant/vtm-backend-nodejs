import {
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
  PureAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Role } from 'src/roles/role.enum';
import { User } from 'src/users/dto';
import { Action } from './casl-actions';
import { CharacterDto } from 'src/characters/dto';

type Subjects = InferSubjects<CharacterDto | typeof CharacterDto> | 'all';

export type AppAbility = PureAbility<[Action, Subjects]>;
const AppAbility = PureAbility as AbilityClass<AppAbility>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, build } = new AbilityBuilder(AppAbility);

    if (user.role === Role.Admin) {
      can(Action.Manage, 'all');
    } else {
      can(Action.Read, CharacterDto, { userId: user.id });
    }

    return build(
      {
        detectSubjectType: (item) =>
          item.constructor as ExtractSubjectType<Subjects>,
      },
      //     {
      //     detectSubjectType: (item) =>
      //         item.__typename,
      // }
    );
  }
}
