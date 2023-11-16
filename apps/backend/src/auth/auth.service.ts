import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserInput } from 'src/users/dto/create-user.dto';
import { UserWithoutPassword } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

import { getCatchErrorMessage } from '@inno/utils';

import { AccessTokenPayload } from './dto/access-token-payload.dto';
import { AuthResponse } from './dto/auth.response.dto';
import { ValidateUserInput } from './dto/validate-user.dto';
import { stripPasswordFromUser } from './helpers/strip-password-from-user';
import { transformUserToClientUser } from './helpers/transform-user-to-client-user';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  private environment = {
    saltRounds: parseInt(this.configService.get<string>('SALT_ROUNDS') ?? '10'),
  };

  /**
   * @name validatePassword
   * @description compares raw password string against the encrypted
   *              password stored in the DB for a given user, if found.
   *              Meant to be used at signup / login with passport local strategy.
   *              Returns null if user is not found or passwords don't match
   *              Otherwise, returns user without password
   */
  async validatePassword(data: ValidateUserInput): Promise<UserWithoutPassword | null> {
    const user = await this.usersService.findUserByEmail(data.email);
    const passwordsMatch = await bcrypt.compare(data.password, user?.password ?? '');
    if (user && passwordsMatch) {
      return stripPasswordFromUser(user);
    }
    return null;
  }

  /**
   * @name setAccessToken
   * @description creates a signed jwt with userId and responds with this as access token
   */
  async setAccessToken(userId: string): Promise<AccessTokenPayload> {
    const payload = { sub: userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * @name signup
   * @description creates a new user in db with hashed pw and
   *              then gets access token to auto-login new user
   */
  async signup(data: CreateUserInput): Promise<AuthResponse> {
    const hashedPassword = await bcrypt.hash(data.password, this.environment.saltRounds);
    try {
      const newUser = await this.usersService.createUser({
        ...data,
        password: hashedPassword,
      });
      const accessToken = await this.setAccessToken(newUser._id);
      const signupResponse: AuthResponse = {
        ...accessToken,
        user: transformUserToClientUser(newUser),
      };
      return signupResponse;
    } catch (error) {
      throw new Error(
        getCatchErrorMessage(error) ?? 'authService.signup -> Unable to signup new user'
      );
    }
  }

  /**
   * @name login
   * @description gets an access token for the newly logged in user
   */
  async login(user: UserWithoutPassword): Promise<AuthResponse> {
    try {
      const accessToken = await this.setAccessToken(user._id);
      const loginResponse: AuthResponse = {
        ...accessToken,
        user: transformUserToClientUser(user),
      };
      return loginResponse;
    } catch (error) {
      throw new Error(
        getCatchErrorMessage(error) ?? 'authService.signup -> Unable to signup new user'
      );
    }
  }
}
