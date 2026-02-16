import Joi from 'joi';
import { IPostgresEnv } from './postgres.types';

export const PostgresSchema = Joi.object<IPostgresEnv>({
  POSTGRES_URL: Joi.string()
    .uri({ scheme: ['postgres'] })
    .required(),
});
