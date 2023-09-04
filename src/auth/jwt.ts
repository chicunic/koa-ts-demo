import * as koa from 'koa';
import * as jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError';

export async function jwtAuthentication(request: koa.Request, scopes?: string[]): Promise<any> {
  const ctx = request.ctx;
  if (!ctx.header || !ctx.header.authorization) {
    throw new ApiError('Authorization header missing', 401);
  }
  const token = (ctx.header.authorization as string).split(' ')[1];
  jwt.verify(token, '[secret]', (err: any, decoded: any) => {
    if (err) {
      throw err;
    } else {
      for (const scope of scopes) {
        if (!decoded.scopes.includes(scope)) {
          throw new ApiError('JWT does not contain required scope.', 401);
        }
      }
      ctx.state.userId = decoded.userId;
      ctx.state.email = decoded.email;
    }
  });
  return ctx.state.userId;
}
