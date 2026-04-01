import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { Asset } from './entities/asset.entity';
import { AssetClass } from './entities/asset-class.entity';
import { MarketDataModule } from '../market-data/market-data.module'; // <-- Import our new module

@Module({
  imports: [
    TypeOrmModule.forFeature([Asset, AssetClass]), // <-- Keep both of your entities here!
    MarketDataModule // <-- Add the live market data to the imports
  ],
  controllers: [AssetsController],
  providers: [AssetsService],
  exports: [TypeOrmModule]
})
export class AssetsModule {}