import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { Transaction } from './entities/transaction.entity';
import { Cedear } from '../cedears/entities/cedear.entity'; // Import Cedear
import { YahooFinanceModule } from '../yahoo-finance/yahoo-finance.module'; // Import Yahoo

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, Cedear]), // Register both entities!
    YahooFinanceModule 
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}