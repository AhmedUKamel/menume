import { Optional } from '@common';
import { User } from '../entities/user.entity';
import { UserRole } from '../enums/user-role.enum';

export type UserCreateInput = Required<
  Pick<
    User,
    'username' | 'firstName' | 'lastName' | 'email' | 'password' | 'roles'
  >
>;

export type UserUpdateInput = Partial<UserCreateInput>;

export type UserFilter = {
  readonly id: Optional<string | string[]>;
  readonly roles: Optional<UserRole | UserRole[]>;
};

export type UserSelect =
  | (keyof User)[]
  | {
      [P in keyof User]?: boolean;
    };

export type UserQueryOptions = {
  readonly filter: Optional<UserFilter>;
  readonly select: Optional<UserSelect>;
};

export type SortDirection = 'asc' | 'desc';

export type UserSort =
  | [keyof User, SortDirection][]
  | {
      [P in keyof User]?: SortDirection;
    };

export type UserSlice = { readonly page: number; readonly size: number };

export type UserPageOptions = UserQueryOptions & {
  readonly sort: Optional<UserSort>;
  readonly slice: Optional<UserSlice>;
};

export type UserPage = {
  readonly items: ReadonlyArray<User>;
  readonly totalCount: number;
};

export interface IUserRepository {
  createOne(input: UserCreateInput): Promise<User>;
  updateOne(id: string, changes: UserUpdateInput): Promise<Optional<User>>;
  updateMany(
    changes: UserUpdateInput,
    options?: Pick<UserQueryOptions, 'filter'>,
  ): Promise<number>;
  deleteOne(id: string): Promise<Optional<User>>;
  deleteMany(options?: Pick<UserQueryOptions, 'filter'>): Promise<number>;

  findOne(options?: Optional<UserQueryOptions>): Promise<Optional<User>>;
  findMany(options?: Optional<UserPageOptions>): Promise<ReadonlyArray<User>>;
  findPage(options?: Optional<UserPageOptions>): Promise<UserPage>;

  exists(options?: Pick<UserQueryOptions, 'filter'>): Promise<boolean>;
  count(options?: Pick<UserQueryOptions, 'filter'>): Promise<number>;
}
