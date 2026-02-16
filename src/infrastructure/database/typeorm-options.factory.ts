import { PostgresFactory } from '@infra/config/postgres/postgres.factory';
import { type IPostgresConfig } from '@infra/config/postgres/postgres.types';
import { Inject, Injectable } from '@nestjs/common';
import {
  TypeOrmOptionsFactory as ITypeOrmOptionsFactory,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

@Injectable()
export class TypeOrmOptionsFactory implements ITypeOrmOptionsFactory {
  public constructor(
    @Inject(PostgresFactory.KEY)
    private readonly postgresConfig: IPostgresConfig,
  ) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    const { url } = this.postgresConfig;

    return {
      type: 'postgres',
      url,

      synchronize: true,
      autoLoadEntities: true,
    };
  }
}
