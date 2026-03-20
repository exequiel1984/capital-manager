import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { Cedear } from '../cedears/entities/cedear.entity';
import { YahooFinanceService } from '../yahoo-finance/yahoo-finance.service';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    
    @InjectRepository(Cedear)
    private cedearRepository: Repository<Cedear>,
    
    private yahooFinanceService: YahooFinanceService,
  ) {}

  async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    // 1. Find the CEDEAR in the master catalog to get its ticker
    const cedear = await this.cedearRepository.findOne({ 
      where: { id: createTransactionDto.cedearId } 
    });

    if (!cedear) {
      throw new NotFoundException(`CEDEAR not found`);
    }

    // 2. Fetch the live market price
    const livePrice = await this.yahooFinanceService.getCurrentPrice(cedear.ticker);

    // 3. Create the transaction record
    const newTransaction = this.transactionRepository.create({
      quantity: createTransactionDto.quantity,
      purchase_price: livePrice,
      user: { id: createTransactionDto.userId }, 
      cedear: { id: createTransactionDto.cedearId } 
      // Notice purchase_date is completely gone!
    });

    // 4. Save to the database
    return await this.transactionRepository.save(newTransaction);
  }

  findAll() {
    return `This action returns all transactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: any) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}