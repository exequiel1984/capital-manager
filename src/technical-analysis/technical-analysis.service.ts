import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MarketDataService } from '../market-data/market-data.service';

@Injectable()
export class TechnicalAnalysisService {
  constructor(private readonly marketDataService: MarketDataService) {}

  /**
   * Calculates the MACD (Moving Average Convergence Divergence) for a given ticker.
   */
  async getMACD(ticker: string) {
    // We need about 90 days of historical data to ensure the Exponential calculations "warm up" and become accurate.
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 90);

    const historicalData = await this.marketDataService.getHistoricalQuotes(ticker, startDate, endDate);

    if (historicalData.length < 35) {
      throw new InternalServerErrorException(`Not enough historical data to calculate MACD for ${ticker}.`);
    }

    // Extract just the closing prices in chronological order
    const closes = historicalData.map(data => data.close);

    // 1. Calculate the 12-day and 26-day EMAs
    const ema12 = this.calculateEMA(closes, 12);
    const ema26 = this.calculateEMA(closes, 26);

    // 2. Calculate the MACD Line (12-day EMA minus 26-day EMA)
    const macdLine: number[] = [];
    for (let i = 0; i < closes.length; i++) {
      macdLine.push(ema12[i] - ema26[i]);
    }

    // 3. Calculate the Signal Line (9-day EMA of the MACD Line)
    const signalLine = this.calculateEMA(macdLine, 9);

    // 4. Format the final output, matching the results to their specific dates
    const results: any[] = [];
    // We only return the most recent 14 days of analysis so the JSON is clean and readable
    const daysToReturn = 14; 
    
    for (let i = closes.length - daysToReturn; i < closes.length; i++) {
      results.push({
        date: historicalData[i].date,
        closePrice: closes[i],
        macdLine: Number(macdLine[i].toFixed(2)),
        signalLine: Number(signalLine[i].toFixed(2)),
        histogram: Number((macdLine[i] - signalLine[i]).toFixed(2))
      });
    }

    return {
      indicator: 'MACD (12, 26, 9)',
      ticker: ticker,
      data: results
    };
  }

  /**
   * Helper Math Function: Calculates the Exponential Moving Average (EMA).
   * EMA gives more weight to recent prices, making it more responsive than a Simple Moving Average.
   */
  private calculateEMA(prices: number[], period: number): number[] {
    const k = 2 / (period + 1);
    const emaArray: number[] = [];
    
    // The first EMA is just the first price in the array
    let currentEma = prices[0];
    emaArray.push(currentEma);

    for (let i = 1; i < prices.length; i++) {
      currentEma = (prices[i] - currentEma) * k + currentEma;
      emaArray.push(currentEma);
    }

    return emaArray;
  }
}