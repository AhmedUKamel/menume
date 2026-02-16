import { InfrastructureModule } from '@infra/infrastructure.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [InfrastructureModule],
})
export class AppModule {}
