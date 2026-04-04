import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UsersModule, // We import this so the AuthService can talk to the Users database
    PassportModule,
    JwtModule.register({
      // IMPORTANT: In production, this MUST be moved to your .env file!
      // For local development right now, we will use a hardcoded string.
      secret: 'super_secret_capital_manager_key_2026', 
      signOptions: { expiresIn: '7d' }, // Token expires in 7 days
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}