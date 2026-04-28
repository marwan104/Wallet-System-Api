import * as Joi from 'joi';

export const ENV_VALIDATION_SCHEMA = Joi.object({
  DB_URI: Joi.string().uri().required(),
  PORT: Joi.number().default(3000),
  APP_NAME: Joi.string().default('Wallet System API'),
});
