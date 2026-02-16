import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigModuleOptions } from './config/config-module.options';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleAsyncOptions } from './database/typeorm-module.options';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(new ConfigModuleOptions()),
    TypeOrmModule.forRootAsync(new TypeOrmModuleAsyncOptions()),
  ],
})
export class InfrastructureModule {}
