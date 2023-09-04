import * as koa from 'koa';
import { jwtAuthentication } from './jwt';
import { sessionAuthentication } from './session';

export function koaAuthentication(request: koa.Request, securityName: string, scopes?: string[]): Promise<any> {
  if (securityName === 'jwt') return jwtAuthentication(request, scopes);
  if (securityName === 'session') return sessionAuthentication(request);
}
