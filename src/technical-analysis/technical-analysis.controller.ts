import { Controller, Get, Param } from '@nestjs/common';
import { TechnicalAnalysisService } from './technical-analysis.service';

@Controller('technical-analysis')
export class TechnicalAnalysisController {
  constructor(private readonly technicalAnalysisService: TechnicalAnalysisService) {}

  // This creates the endpoint: /technical-analysis/macd/:ticker
  @Get('macd/:ticker')
  async getMACD(@Param('ticker') ticker: string) {
    return this.technicalAnalysisService.getMACD(ticker);
  }
}