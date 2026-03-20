import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CedearsService } from './cedears.service';
import { CedearsController } from './cedears.controller';
import { Cedear } from './entities/cedear.entity';
import { YahooFinanceModule } from '../yahoo-finance/yahoo-finance.module'; // Add this import

@Module({
  imports: [
    TypeOrmModule.forFeature([Cedear]), 
    YahooFinanceModule // Add it here!
  ], 
  controllers: [CedearsController],
  providers: [CedearsService],
})
export class CedearsModule {}