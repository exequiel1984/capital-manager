import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { Asset } from '../assets/entities/asset.entity';
import { AssetClass } from '../assets/entities/asset-class.entity';
import { YahooFinanceService } from '../yahoo-finance/yahoo-finance.service';
import * as xlsx from 'xlsx';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    
    @InjectRepository(Asset)
    private assetRepository: Repository<Asset>,
    
    @InjectRepository(AssetClass)
    private assetClassRepository: Repository<AssetClass>,

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
      user: { id: createTransactionDto.userId as any }, 
      asset: { id: asset.id as any }
    });

    // 4. Save to the database
    return await this.transactionRepository.save(newTransaction);
  }

  async getPortfolio(userId: string) {
    // 1. Fetch all transactions for this specific user
    const transactions = await this.transactionRepository.find({
      where: { user: { id: userId as any } },
      relations: ['asset'], 
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
        ticker: tx.asset.ticker,
        name: tx.asset.name,
        shares: tx.quantity,
        purchasePrice: tx.purchase_price,
        purchaseDate: tx.purchase_date
      }))
    };
  }

  async importBalanzHistory(file: any, userId: string) {
    if (!file) throw new BadRequestException('No file uploaded');

    const workbook = xlsx.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const rawData = xlsx.utils.sheet_to_json<any>(workbook.Sheets[sheetName]);

    let importedCount = 0;

    for (const row of rawData) {
      if (Number(row['Precio']) === -1) continue;
      if (!row['Ticker'] || row['Ticker'] === '-') continue;

      const cleanPriceStr = String(row['Precio']).replace('.', '').replace(',', '.');
      const price = parseFloat(cleanPriceStr);
      const quantity = Number(row['Cantidad']);
      const ticker = String(row['Ticker']).trim();

      // Look up the real Asset UUID using your injected repository
      let asset = await this.assetRepository.findOne({ 
        where: { ticker: ticker } 
      });

      if (!asset) {
        // 1. Find or create the Asset Class dynamically from Excel
        const instrumentType = row['Tipo de Instrumento'] || 'Desconocido';
        let assetClass = await this.assetClassRepository.findOne({ 
          where: { name: instrumentType } 
        });

        if (!assetClass) {
          assetClass = this.assetClassRepository.create({ name: instrumentType });
          await this.assetClassRepository.save(assetClass);
        }

        asset = this.assetRepository.create({ 
          ticker: ticker, 
          name: `Imported Asset (${ticker})`,
          assetClass: assetClass // Uses the exact relation name from your entity
        });
        await this.assetRepository.save(asset);
      } // <--- THIS WAS THE MISSING BRACKET

      // Now this correctly runs for EVERY row, whether the asset is new or existing
      const newTransaction = this.transactionRepository.create({
        user: { id: userId as any },
        asset: asset,
        quantity: quantity,
        purchase_price: price,
        purchase_date: new Date(row['Concertacion'])
      });

      await this.transactionRepository.save(newTransaction);
      
      importedCount++;
    }

    return { 
      message: 'Import successful', 
      transactionsProcessed: importedCount 
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