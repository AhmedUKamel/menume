import { InfrastructureModule } from '@infra/infrastructure.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  imports: [InfrastructureModule],
  controllers: [AppController],
})
export class AppModule {}
