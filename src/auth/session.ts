import * as koa from 'koa';
import { ApiError } from '../utils/ApiError';

export async function sessionAuthentication(request: koa.Request): Promise<any> {
  const ctx = request.ctx;
  if (ctx.session && ctx.session.userId) {
    return ctx.session.userId;
  } else {
    throw new ApiError('Unauthorized', 401);
  }
}
