import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateUserInput } from 'src/users/dto/create-user.dto';

import { AuthService } from './auth.service';
import { LocalAuthenticationGuard } from './guards/local-rest-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async signup(@Body() newUserData: CreateUserInput) {
    return this.authService.signup(newUserData);
  }

  @Post()
  @UseGuards(LocalAuthenticationGuard)
  async login(@Body() newUserData: CreateUserInput) {
    return this.authService.signup(newUserData);
  }
}
