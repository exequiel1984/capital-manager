import { Injectable, InternalServerErrorException } from '@nestjs/common';
import YahooFinance from 'yahoo-finance2';

const yahooFinance = new YahooFinance();

@Injectable()
export class MarketDataService {
  
  /**
   * Fetches real-time market data for a list of asset tickers.
   * @param tickers Array of string tickers (e.g., ['AAPL.BA', 'KO.BA'])
   */
  async getLiveQuotes(tickers: string[]) {
    try {
      const quotes = await yahooFinance.quote(tickers);
      const normalizedQuotes = Array.isArray(quotes) ? quotes : [quotes];

      return normalizedQuotes.map(quote => ({
        ticker: quote.symbol,
        company: quote.shortName || quote.longName,
        currency: quote.currency,
        price: quote.regularMarketPrice,
        marketState: quote.marketState,
      }));
    } catch (error) {
      console.error('MarketDataService Error:', error);
      throw new InternalServerErrorException(`Failed to fetch market data. Reason: ${error.message}`);
    }
  }

  /**
   * Fetches historical daily closing prices for a specific asset to be used in Technical Analysis.
   * @param ticker The asset ticker (e.g., 'AAPL.BA')
   * @param startDate The beginning of the historical period
   * @param endDate The end of the historical period (defaults to the current date/time)
   */
  async getHistoricalQuotes(ticker: string, startDate: Date, endDate: Date = new Date()) {
    try {
      // Configure the query for Yahoo Finance
      const queryOptions = {
        period1: startDate,
        period2: endDate,
        interval: '1d' as const, // We request daily candles (1 day)
      };

      // Fetch the historical array from Yahoo
      const historicalData = await yahooFinance.historical(ticker, queryOptions);

      // Map the raw data into a clean, predictable structure for our indicator calculations
      return historicalData.map(entry => ({
        date: entry.date,
        open: entry.open,
        high: entry.high,
        low: entry.low,
        close: entry.close,   // The most critical data point for technical analysis
        volume: entry.volume,
      }));

    } catch (error) {
      console.error(`Historical Data Error for ${ticker}:`, error);
      throw new InternalServerErrorException(`Failed to fetch historical data for ${ticker}. Reason: ${error.message}`);
    }
  }
}