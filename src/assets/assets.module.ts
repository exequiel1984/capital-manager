import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { Asset } from './entities/asset.entity';
import { AssetClass } from './entities/asset-class.entity';

@Module({
  // This registers both tables with TypeORM for this module
  imports: [TypeOrmModule.forFeature([Asset, AssetClass])],
  controllers: [AssetsController],
  providers: [AssetsService],
  exports: [TypeOrmModule] // Export this so TransactionsModule can use it!
})
export class AssetsModule {}  
