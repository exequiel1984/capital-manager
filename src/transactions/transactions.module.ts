import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { Transaction } from './entities/transaction.entity';
import { Asset } from '../assets/entities/asset.entity';
import { AssetClass } from '../assets/entities/asset-class.entity';
import { YahooFinanceModule } from '../yahoo-finance/yahoo-finance.module'; // Import Yahoo

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Asset, AssetClass]), YahooFinanceModule],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}