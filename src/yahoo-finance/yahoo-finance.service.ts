import { Injectable, Logger, BadRequestException } from '@nestjs/common';
// 1. Notice the capital "Y" here now
import YahooFinance from 'yahoo-finance2';

// 2. We must initialize the package before using it!
const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] });

@Injectable()
export class YahooFinanceService {
  private readonly logger = new Logger(YahooFinanceService.name);

  async getCurrentPrice(ticker: string): Promise<number> {
    try {
      // 3. We now use the initialized 'yahooFinance' constant here
      const quote: any = await yahooFinance.quote(ticker);
      
      if (!quote || !quote.regularMarketPrice) {
        throw new BadRequestException(`No price data found for ticker: ${ticker}`);
      }

      return quote.regularMarketPrice;
    } catch (error: any) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      
      this.logger.error(`Failed to fetch data for ${ticker}`, error.stack);
      throw new BadRequestException(`Could not fetch market data for ${ticker}`);
    }
  }
}