import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm'; // Add CreateDateColumn to imports
import { User } from '../../users/entities/user.entity';
import { Cedear } from '../../cedears/entities/cedear.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  purchase_price: number;

  // This replaces the old @Column({ type: 'date' })
  // TypeORM will automatically make this a DATETIME in MySQL and fill it for you!
  @CreateDateColumn()
  purchase_date: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Cedear)
  @JoinColumn({ name: 'cedear_id' })
  cedear: Cedear;
}