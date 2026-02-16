import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  public getHome(): string {
    return `Menume server is up and running for ${Math.floor(process.uptime())} seconds!`;
  }
}
