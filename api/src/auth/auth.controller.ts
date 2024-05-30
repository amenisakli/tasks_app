import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateWriteStreamOptions } from 'fs/promises';
import { Certificate } from 'crypto';
import { SignIn } from './logindto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@Body() user: SignIn) {
    return this.authService.login(user);
  }
}
