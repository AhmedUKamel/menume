import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigModuleOptions } from './config/config-module.options';

@Global()
@Module({
  imports: [ConfigModule.forRoot(new ConfigModuleOptions())],
})
export class InfrastructureModule {}
