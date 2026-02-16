import Joi from 'joi';

export abstract class ValidationUtils {
  public static validate<T>(schema: Joi.AnySchema<T>, data: unknown): T {
    const { error, value } = schema.validate(data, {
      convert: true,
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    });

    if (error !== undefined) {
      throw new Error(`Configuration validation error: ${error.message}`);
    }

    return value;
  }
}
