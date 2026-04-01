import { Module } from '@nestjs/common';
import { TechnicalAnalysisService } from './technical-analysis.service';
import { MarketDataModule } from '../market-data/market-data.module'; // <-- Import this
import { TechnicalAnalysisController } from './technical-analysis.controller';

@Module({
  imports: [MarketDataModule], // <-- Add it to the imports array
  providers: [TechnicalAnalysisService], controllers: [TechnicalAnalysisController]
})
export class TechnicalAnalysisModule {}