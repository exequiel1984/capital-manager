import { Module } from '@nestjs/common';
import { YahooFinanceService } from './yahoo-finance.service';

@Module({
  providers: [YahooFinanceService],
  exports: [YahooFinanceService] // This allows other modules to use this service!
})
export class YahooFinanceModule {}