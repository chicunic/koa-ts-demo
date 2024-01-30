import * as koa from 'koa';
import { jwtAuthentication } from './jwt';
import { sessionAuthentication } from './session';

export async function koaAuthentication(request: koa.Request, securityName: string, scopes?: string[]): Promise<any> {
  if (securityName === 'jwt') return await jwtAuthentication(request, scopes);
  if (securityName === 'session') return await sessionAuthentication(request);
}
