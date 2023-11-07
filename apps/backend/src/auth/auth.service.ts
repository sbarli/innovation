import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { CreateUserInput } from 'src/users/dto/create-user.dto';
// import { GetUserInput } from 'src/users/dto/get-user.dto';
import { UserWithoutPassword } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

import { getCatchErrorMessage } from '@inno/utils';

import { ValidateUserInput } from './dto/validate-user.dto';
import { stripPasswordFromUser } from './helpers/strip-password-from-user';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService
  ) {}

  private environment = {
    saltRounds: parseInt(this.configService.get<string>('SALT_ROUNDS') ?? '10'),
  };

  async validateUser(data: ValidateUserInput): Promise<UserWithoutPassword | null> {
    const user = await this.usersService.findUserByEmail(data.email);
    const passwordsMatch = await bcrypt.compare(data.password, user?.password ?? '');
    if (user && passwordsMatch) {
      return stripPasswordFromUser(user);
    }
    return null;
  }

  // async login(data: GetUserInput) {
  //   try {
  //     const user = await this.usersService.findUserByEmail(data.email);
  //     const passwordsMatch = await bcrypt.compare(data.password, user?.password ?? '');
  //     if (!user || !passwordsMatch) {
  //       throw new UnauthorizedException();
  //     }
  //     return stripPasswordFromUser(user);
  //   } catch (error) {
  //     throw new Error(getCatchErrorMessage(error));
  //   }
  // }

  async signup(data: CreateUserInput): Promise<UserWithoutPassword> {
    const hashedPassword = await bcrypt.hash(data.password, this.environment.saltRounds);
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const newUser = await this.usersService.createUser({
        ...data,
        password: hashedPassword,
      });
      return stripPasswordFromUser(newUser);
    } catch (error) {
      throw new Error(
        getCatchErrorMessage(error) ?? 'authService.signup -> Unable to signup new user'
      );
    }
  }
}
