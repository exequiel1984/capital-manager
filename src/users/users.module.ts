import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';

@Module({
  // This line registers the User entity
  imports: [TypeOrmModule.forFeature([User])], 
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
