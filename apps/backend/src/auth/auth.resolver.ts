import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from 'src/users/dto/create-user.dto';
import { GetUserInput } from 'src/users/dto/get-user.dto';
import { UserWithoutPassword } from 'src/users/schemas/user.schema';

import { AuthService } from './auth.service';
import { LocalGqlAuthGuard } from './guards/local-gql-auth.guard';

@Resolver('auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserWithoutPassword)
  async signup(@Args('newUserData') newUserData: CreateUserInput): Promise<UserWithoutPassword> {
    return this.authService.signup(newUserData);
  }

  @Query(() => UserWithoutPassword)
  @UseGuards(LocalGqlAuthGuard)
  async login(
    @Args('loginUserInput') _loginUserInput: GetUserInput,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Context() context: any
  ): Promise<UserWithoutPassword> {
    return context.req.user;
  }
}
