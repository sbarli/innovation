import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { getCatchErrorMessage } from '@inno/utils';

import { UserWithoutPassword } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

import { JwtPayload } from '../dto/jwt-payload.dto';
import { stripPasswordFromUser } from '../helpers/strip-password-from-user';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    protected configService: ConfigService,
    private usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_REFRESH_SECRET') ?? '',
    });
  }

  /**
   * @name validate
   * @description attempts to find user with given jwt id.
   *              when user is found, returns user sans password
   *              when user is not found, throws error.
   * @see https://docs.nestjs.com/recipes/passport#implementing-passport-jwt
   */
  async validate(jwtPayload: JwtPayload): Promise<UserWithoutPassword> {
    try {
      const user = await this.usersService.findUserByRef(jwtPayload.sub);
      if (!user) {
        throw new Error(`No user found with _id ${jwtPayload.sub}`);
      }
      return stripPasswordFromUser(user);
    } catch (error) {
      console.error(
        getCatchErrorMessage(error) ?? 'RefreshJwtStrategy.validate -> Unable to validate user'
      );
      throw new UnauthorizedException();
    }
  }
}
