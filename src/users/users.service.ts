import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Used by the Auth system to check if a user exists when they log in
  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  // Used to register a brand new user
  async create(userData: Partial<User>): Promise<User> {
    // 1. Check if the email is already registered
    const existingUser = await this.findOneByEmail(userData.email as string);
    if (existingUser) {
      throw new ConflictException('This email is already registered.');
    }

    // 2. Hash the password securely! (10 salt rounds is the industry standard)
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password as string, saltRounds);

    // 3. Prepare the new user object with the scrambled password
    const newUser = this.usersRepository.create({
      ...userData,
      password: hashedPassword,
    });

    // 4. Save to the AWS database
    return this.usersRepository.save(newUser);
  }
}