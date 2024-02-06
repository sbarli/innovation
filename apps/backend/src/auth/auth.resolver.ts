import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from 'src/users/dto/create-user.dto';
import { GetUserInput } from 'src/users/dto/get-user.dto';
import { UserWithoutPassword } from 'src/users/schemas/user.schema';

import { AuthService } from './auth.service';
import { GqlCtx } from './auth.types';
import { AuthResponse } from './dto/auth.response.dto';
import { JwtGqlAuthGuard } from './guards/jwt-gql-auth.guard';
import { LocalGqlAuthGuard } from './guards/local-gql-auth.guard';
import { transformUserToClientUser } from './helpers/transform-user-to-client-user';

@Resolver('auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async signup(@Args('newUserData') newUserData: CreateUserInput): Promise<AuthResponse> {
    return this.authService.signup(newUserData);
  }

  @Query(() => AuthResponse)
  @UseGuards(LocalGqlAuthGuard)
  async login(
    @Args('loginUserInput') _loginUserInput: GetUserInput,
    @Context() context: GqlCtx
  ): Promise<AuthResponse> {
    return this.authService.login(context.req.user);
  }

  @Query(() => UserWithoutPassword)
  @UseGuards(JwtGqlAuthGuard)
  async isAuthenticated(@Context() context: GqlCtx): Promise<UserWithoutPassword> {
    return transformUserToClientUser(context.req.user);
  }
}
