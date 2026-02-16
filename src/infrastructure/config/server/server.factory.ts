import { registerAs } from '@nestjs/config';
import { ValidationUtils } from '../utils/validation.utils';
import { ServerSchema } from './server.schema';
import { IServerConfig } from './server.types';

export function createServerConfig(): IServerConfig {
  const env = ValidationUtils.validate(ServerSchema, process.env);

  return Object.freeze<IServerConfig>({
    port: env.SERVER_PORT,
    host: env.SERVER_HOST,
  });
}

export const ServerFactory = registerAs('server', createServerConfig);
