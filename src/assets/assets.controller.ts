import { Controller, Get, Param } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { MarketDataService } from '../market-data/market-data.service';

@Controller('assets')
export class AssetsController {
  constructor(
    private readonly assetsService: AssetsService,
    // Injecting this temporarily just for our browser test!
    private readonly marketDataService: MarketDataService 
  ) {}

  @Get('live')
  async getLiveAssets() {
    return this.assetsService.getLiveAssetCatalog();
  }

  // 🧪 TEMPORARY TEST ENDPOINT
  // We use a route parameter (:ticker) so you can test different assets dynamically
  @Get('historical/:ticker')
  async testHistoricalData(@Param('ticker') ticker: string) {
    // Let's fetch the last 30 days of data for this test
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);

    return this.marketDataService.getHistoricalQuotes(ticker, startDate, endDate);
  }
}