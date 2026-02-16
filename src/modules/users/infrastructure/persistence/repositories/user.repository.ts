import { Optional } from '@common/types';
import { User } from '@modules/users/domain/entities/user.entity';
import {
  IUserRepository,
  SortDirection,
  UserCreateInput,
  UserPage,
  UserPageOptions,
  UserQueryOptions,
  UserUpdateInput,
} from '@modules/users/domain/repositories/user.repository';
import {
  FindOptionsOrder,
  FindOptionsSelect,
  FindOptionsWhere,
  In,
  Repository,
} from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserPersistenceMapper } from '../mappers/user.mapper';

export class UserRepository implements IUserRepository {
  public constructor(
    private readonly repository: Repository<UserEntity>,
    private readonly mapper: UserPersistenceMapper,
  ) {}

  public async createOne(input: UserCreateInput): Promise<User> {
    return this.tryCatch(async () => {
      const createInput = this.repository.create(input);
      const createdUser = await this.repository.save(createInput);
      return this.mapper.mapUserPersistenceToDomain(createdUser);
    });
  }

  public async updateOne(
    id: string,
    changes: UserUpdateInput,
  ): Promise<Optional<User>> {
    return this.tryCatch(async () => {
      const updateInput = this.repository.create(changes);
      const { affected } = await this.repository.update({ id }, updateInput);
      if (affected === undefined || affected === 0) {
        return null;
      }
      const updatedUser = await this.repository.findOneBy({ id });
      return updatedUser !== null
        ? this.mapper.mapUserPersistenceToDomain(updatedUser)
        : updatedUser;
    });
  }

  public async updateMany(
    changes: UserUpdateInput,
    options?: Pick<UserQueryOptions, 'filter'>,
  ): Promise<number> {
    return this.tryCatch(async () => {
      const updateInput = this.repository.create(changes);
      const where = this.createWhere(options?.filter) ?? {};
      const { affected } = await this.repository.update(where, updateInput);
      return affected ?? 0;
    });
  }

  public async deleteOne(id: string): Promise<Optional<User>> {
    return this.tryCatch(async () => {
      const matchUser = await this.repository.findOneBy({ id });
      if (matchUser === null) {
        return null;
      }
      await this.repository.delete({ id });
      return matchUser !== null
        ? this.mapper.mapUserPersistenceToDomain(matchUser)
        : matchUser;
    });
  }
  public async deleteMany(
    options?: Pick<UserQueryOptions, 'filter'>,
  ): Promise<number> {
    return this.tryCatch(async () => {
      const where = this.createWhere(options?.filter) ?? {};
      const { affected } = await this.repository.delete(where);
      return affected ?? 0;
    });
  }

  public async findOne(
    options?: Optional<UserQueryOptions>,
  ): Promise<Optional<User>> {
    return this.tryCatch(async () => {
      const where = this.createWhere(options?.filter) ?? {};
      const select = this.createSelect(options?.select) ?? {};
      const matchUser = await this.repository.findOne({ where, select });
      return matchUser !== null
        ? this.mapper.mapUserPersistenceToDomain(matchUser)
        : matchUser;
    });
  }

  public async findMany(
    options?: Optional<UserPageOptions>,
  ): Promise<ReadonlyArray<User>> {
    return this.tryCatch(async () => {
      const where = this.createWhere(options?.filter) ?? {};
      const select = this.createSelect(options?.select) ?? {};
      const order = this.createOrder(options?.sort) ?? {};
      const { page, size } = options?.slice ?? {};
      let skip: number | undefined, take: number | undefined;
      if (page !== undefined && size !== undefined) {
        skip = (page - 1) * size;
        take = size;
      }
      const matchUsers = await this.repository.find({
        where,
        select,
        order,
        skip,
        take,
      });
      return matchUsers.map(this.mapper.mapUserPersistenceToDomain);
    });
  }

  public async findPage(
    options?: Optional<UserPageOptions>,
  ): Promise<UserPage> {
    return this.tryCatch(async () => {
      const where = this.createWhere(options?.filter) ?? {};
      const select = this.createSelect(options?.select) ?? {};
      const order = this.createOrder(options?.sort) ?? {};
      const { page, size } = options?.slice ?? {};
      let skip: number | undefined, take: number | undefined;
      if (page !== undefined && size !== undefined) {
        skip = (page - 1) * size;
        take = size;
      }
      const [matchUsers, totalCount] = await this.repository.findAndCount({
        where,
        select,
        order,
        skip,
        take,
      });
      const items = matchUsers.map(this.mapper.mapUserPersistenceToDomain);
      return { items, totalCount };
    });
  }

  public async exists(
    options?: Pick<UserQueryOptions, 'filter'>,
  ): Promise<boolean> {
    return this.tryCatch(async () => {
      const where = this.createWhere(options?.filter) ?? {};
      return this.repository.existsBy(where);
    });
  }

  public async count(
    options?: Pick<UserQueryOptions, 'filter'>,
  ): Promise<number> {
    return this.tryCatch(async () => {
      const where = this.createWhere(options?.filter) ?? {};
      return this.repository.countBy(where);
    });
  }

  private async tryCatch<TResult>(
    action: () => Promise<TResult>,
  ): Promise<TResult> {
    try {
      return await action();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`DATA_ACCESS_EXCEPTION: ${message}`);
    }
  }

  private createWhere(
    filter?: UserQueryOptions['filter'],
  ): FindOptionsWhere<UserEntity> | undefined {
    if (filter !== null && filter !== undefined) {
      let where: FindOptionsWhere<UserEntity> = {};

      if (filter.id !== null && filter.id !== undefined) {
        where = {
          ...where,
          id: Array.isArray(filter.id) ? In(filter.id) : filter.id,
        };
      }

      if (filter.roles !== null && filter.roles !== undefined) {
        where = {
          ...where,
          roles: Array.isArray(filter.roles)
            ? In(filter.roles)
            : [filter.roles],
        };
      }

      return where;
    }
  }

  private createOrder(
    sort?: UserPageOptions['sort'],
  ): FindOptionsOrder<UserEntity> | undefined {
    if (sort !== null && sort !== undefined) {
      if (!Array.isArray(sort)) {
        return sort;
      }

      return sort.reduce(
        (
          order: FindOptionsOrder<UserEntity>,
          [key, direction]: [keyof User, SortDirection],
        ) => {
          return { ...order, [key]: direction };
        },
        {},
      );
    }
  }

  private createSelect(
    select?: UserPageOptions['select'],
  ): FindOptionsSelect<UserEntity> | undefined {
    if (select !== null && select !== undefined) {
      if (!Array.isArray(select)) {
        return select;
      }

      return select.reduce(
        (select: FindOptionsSelect<UserEntity>, key: keyof User) => {
          return { ...select, [key]: true };
        },
        {},
      );
    }
  }
}
