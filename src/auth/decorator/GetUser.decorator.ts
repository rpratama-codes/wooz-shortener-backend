import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserFromJwt } from '../dto';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();
    const user: UserFromJwt | any = request.user;
    return user;
  },
);
