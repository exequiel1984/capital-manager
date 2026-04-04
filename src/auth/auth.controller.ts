import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: any) {
    return this.authService.register(registerDto);
  }

  @HttpCode(HttpStatus.OK) // Returns a 200 OK instead of the default 201 Created
  @Post('login')
  async login(@Body() loginDto: any) {
    return this.authService.login(loginDto);
  }
}