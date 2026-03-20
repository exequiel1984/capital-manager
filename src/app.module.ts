import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CedearsModule } from './cedears/cedears.module'; // The CLI added this
import { YahooFinanceModule } from './yahoo-finance/yahoo-finance.module';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    // Your database connection is back!
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'cedear_tracker',
      autoLoadEntities: true,
      synchronize: true, 
    }),
    CedearsModule,
    YahooFinanceModule,
    UsersModule,
    TransactionsModule, // The CLI registered your new module here
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}