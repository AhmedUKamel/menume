import { registerAs } from '@nestjs/config';
import { ValidationUtils } from '../utils/validation.utils';
import { PostgresSchema } from './postgres.schema';
import { IPostgresConfig } from './postgres.types';

export function createPostgresConfig(): IPostgresConfig {
  const env = ValidationUtils.validate(PostgresSchema, process.env);

  return Object.freeze<IPostgresConfig>({
    url: env.POSTGRES_URL,
  });
}

export const PostgresFactory = registerAs('postgres', createPostgresConfig);
