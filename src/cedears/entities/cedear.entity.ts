import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cedears') 
export class Cedear {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ticker: string;

  @Column()
  company: string;
}