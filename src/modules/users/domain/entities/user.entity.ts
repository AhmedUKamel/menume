import { NonEmptyReadonlyArray } from '@common';
import { UserRole } from '../enums/user-role.enum';

export class User {
  public constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly password: string,
    public readonly roles: NonEmptyReadonlyArray<UserRole>,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
