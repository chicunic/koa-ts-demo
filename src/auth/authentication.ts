import * as koa from 'koa';
import * as jwt from 'jsonwebtoken';

export function koaAuthentication(request: koa.Request, securityName: string, scopes?: string[]): Promise<any> {
  const ctx = request.ctx;
  if (securityName === 'jwt') {
    return new Promise((resolve, reject) => {
      if (!ctx.header || !ctx.header.authorization) {
        reject(new Error('Authorization header missing'));
      }
      const token = (ctx.header.authorization as string).split(' ')[1];
      jwt.verify(token, '[secret]', (err: any, decoded: any) => {
        if (err) {
          reject(err);
        } else {
          for (const scope of scopes) {
            if (!decoded.scopes.includes(scope)) {
              reject(new Error('JWT does not contain required scope.'));
            }
          }
          ctx.state.userId = decoded.userId;
          ctx.state.email = decoded.email;
          resolve(ctx.state.userId);
        }
      });
    });
  }
  if (securityName === 'session') {
    return new Promise((resolve, reject) => {
      if (ctx.session && ctx.session.userId) {
        resolve(ctx.session.userId);
      } else {
        reject(new Error('Unauthorized'));
      }
    });
  }
}
