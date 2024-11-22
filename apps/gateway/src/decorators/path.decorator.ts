import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const PathDecorator = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const path = request.path;
    return data ? path : path;
  },
);
