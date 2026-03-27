import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { YahooFinanceModule } from './yahoo-finance/yahoo-finance.module';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AssetsModule } from './assets/assets.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'capital-manager-db.cpmc8me6c67f.us-east-2.rds.amazonaws.com', // Your AWS Endpoint
      port: 3306,
      username: 'admin', // AWS Master Username
      password: process.env.DB_PASSWORD, // The password you created for RDS
      database: 'capital_manager', // The database you just created in HeidiSQL
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // This tells TypeORM to build the tables in the cloud automatically
    }),
    YahooFinanceModule,
    UsersModule,
    TransactionsModule,
    AssetsModule, // The CLI registered your new module here
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}