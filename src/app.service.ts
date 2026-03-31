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
      // Log the full error to your PM2 server console
      console.error('Yahoo Finance Error:', error); 
      
      // Send the specific error message to the browser so we can read it
      throw new InternalServerErrorException(`Failed to fetch data for ${ticker}. Reason: ${error.message}`);
    }
  }
}