import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    // We are now handing the data off to the service we wrote!
    return await this.transactionsService.create(createTransactionDto);
  }

  @Post('import/balanz')
  @UseInterceptors(FileInterceptor('file'))
  async uploadBalanzHistory(
    @UploadedFile() file: any,
    @Body('userId') userId: string // <-- Now it dynamically reads the userId from the request!
  ) {
    // Pass the dynamic userId to the service
    return await this.transactionsService.importBalanzHistory(file, userId);
  }

  // This listens for GET requests like: http://localhost:3000/transactions/portfolio/1
  @Get('portfolio/:userId')
  async getPortfolio(@Param('userId') userId: string) {
    // We use the '+' sign to quickly convert the URL string parameter into a number
    return await this.transactionsService.getPortfolio(userId);
  }




  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionsService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }
}
