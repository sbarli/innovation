import { Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalGqlAuthGuard extends AuthGuard('local') {
  getRequest(context: GqlExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    req.body = ctx.getArgs().loginUserInput;
    return req;
  }
}
