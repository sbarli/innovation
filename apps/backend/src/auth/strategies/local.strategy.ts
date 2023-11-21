import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  /**
   * @name validate
   * @description validates that the user's password matches the unhashed version in the DB
   *              when passwords match, returns user
   *              when passwords don't match, throws UnauthorizedException
   * @see https://docs.nestjs.com/recipes/passport#implementing-passport-local
   */
  async validate(email: string, password: string) {
    const user = await this.authService.validatePassword({ email, password });
    if (!user) {
      throw new UnauthorizedException('Login failed');
    }
    return user;
  }
}
