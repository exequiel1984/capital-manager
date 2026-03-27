import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { AssetClass } from './asset-class.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';

@Entity('assets')
export class Asset {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  ticker: string; // e.g., 'AAPL.BA', 'BTC-USD'

  @Column()
  name: string; // e.g., 'Apple Inc.', 'Bitcoin'

  // Many Assets belong to One AssetClass
  @ManyToOne(() => AssetClass, (assetClass) => assetClass.assets)
  @JoinColumn({ name: 'asset_class_id' })
  assetClass: AssetClass;

  // One Asset can have Many Transactions from different users
  @OneToMany(() => Transaction, (transaction) => transaction.asset)
  transactions: Transaction[];
}