import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getTrackingData() {
    // Call the new async method
    return this.appService.getLiveCedear();
  }
}