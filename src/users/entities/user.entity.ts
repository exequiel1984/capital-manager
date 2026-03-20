import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // The 'unique: true' ensures no two users can register with the same email
  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // We will learn how to properly hash this later!
}