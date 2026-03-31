import { Injectable, InternalServerErrorException } from '@nestjs/common';
import yahooFinance from 'yahoo-finance2';

@Injectable()
export class AppService {
  
  async getLiveCedear(ticker: string = 'AAPL.BA') {
    try {
      // Fetch the live quote from Yahoo Finance
      const quote = await yahooFinance.quote(ticker);

      return {
        ticker: quote.symbol,
        company: quote.shortName || quote.longName,
        currency: quote.currency,
        price: quote.regularMarketPrice,
        status: 'CI/CD Pipeline is LIVE! 🚀 - Now with REAL Market Data!'
      };
    } catch (error) {
      // If Yahoo Finance is down or the ticker is invalid, gracefully handle the error
      throw new InternalServerErrorException(`Failed to fetch data for ticker: ${ticker}`);
    }
  }
}