import { TypeOrmModuleAsyncOptions as ITypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { TypeOrmOptionsFactory } from './typeorm-options.factory';

export class TypeOrmModuleAsyncOptions implements ITypeOrmModuleAsyncOptions {
  public readonly name = 'default';
  public readonly useClass = TypeOrmOptionsFactory;
}
