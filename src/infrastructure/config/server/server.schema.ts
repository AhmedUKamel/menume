import Joi from 'joi';
import { IServerEnv } from './server.types';

export const ServerSchema = Joi.object<IServerEnv>({
  SERVER_PORT: Joi.number().port().required(),
  SERVER_HOST: Joi.string().hostname().allow('0.0.0.0').required(),
});
