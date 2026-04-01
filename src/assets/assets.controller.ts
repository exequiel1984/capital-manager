import { Controller, Get } from '@nestjs/common';
import { AssetsService } from './assets.service';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Get('live')
  async getLiveAssets() {
    return this.assetsService.getLiveAssetCatalog();
  }
}