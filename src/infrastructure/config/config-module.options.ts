import Joi from 'joi';
import { ConfigModuleOptions as IConfigModuleOptions } from '@nestjs/config';
import { ServerFactory } from './server/server.factory';
import { ServerSchema } from './server/server.schema';
import { PostgresFactory } from './postgres/postgres.factory';
import { PostgresSchema } from './postgres/postgres.schema';

export class ConfigModuleOptions implements IConfigModuleOptions<Joi.ValidationOptions> {
  public readonly cache = true;
  public readonly isGlobal = true;
  public readonly envFilePath = '.env';
  public readonly load = [ServerFactory, PostgresFactory];
  public readonly validationOptions = {
    convert: true,
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };
  public readonly validationSchema = [ServerSchema, PostgresSchema].reduce(
    (
      mergedSchema: Joi.AnySchema,
      currentSchema: Joi.AnySchema,
    ): Joi.AnySchema => mergedSchema.concat(currentSchema),
    Joi.object(),
  );
}
