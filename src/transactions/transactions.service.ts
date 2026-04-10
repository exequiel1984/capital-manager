  import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { Asset } from '../assets/entities/asset.entity';
import { YahooFinanceService } from '../yahoo-finance/yahoo-finance.service';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    
    @InjectRepository(Asset)
    private assetRepository: Repository<Asset>,
    
    private yahooFinanceService: YahooFinanceService,
  ) {}

  async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    // 1. Find the Asset using the new repository
    const asset = await this.assetRepository.findOne({ 
      where: { id: createTransactionDto.assetId } 
    });

    if (!asset) {
      throw new NotFoundException(`Asset not found`);
    }

    // 2. Fetch the live market price
    const livePrice = await this.yahooFinanceService.getCurrentPrice(asset.ticker);

    // 3. Create the transaction record
    const newTransaction = this.transactionRepository.create({
      quantity: createTransactionDto.quantity,
      purchase_price: livePrice,
      user: { id: createTransactionDto.userId }, 
      asset: { id: asset.id } // <-- Updated from cedear to asset!
    });

    // 4. Save to the database
    return await this.transactionRepository.save(newTransaction);
  }

  async getPortfolio(userId: string) {
    // 1. Fetch all transactions for this specific user
    const transactions = await this.transactionRepository.find({
      where: { user: { id: userId } },
      relations: ['asset'], // <-- Updated relation name!
    });

    // 2. Calculate the total invested value
    const totalInvested = transactions.reduce((sum, transaction) => {
      const transactionValue = transaction.quantity * transaction.purchase_price;
      return sum + transactionValue;
    }, 0);

    // 3. Return a beautifully formatted JSON response
    return {
      userId: userId,
      totalInvested: Number(totalInvested.toFixed(2)),
      assetCount: transactions.length,
      assets: transactions.map(tx => ({
        transactionId: tx.id,
        ticker: tx.asset.ticker,   // <-- Updated to tx.asset
        name: tx.asset.name,       // <-- Updated to tx.asset.name
        shares: tx.quantity,
        purchasePrice: tx.purchase_price,
        purchaseDate: tx.purchase_date
      }))
    };
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