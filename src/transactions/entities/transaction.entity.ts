import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Asset } from '../../assets/entities/asset.entity';
import { User } from '../../users/entities/user.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  purchase_price: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  purchase_date: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Asset, (asset) => asset.transactions)
  @JoinColumn({ name: 'asset_id' })
  asset: Asset; 
}