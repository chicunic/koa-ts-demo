import * as koa from 'koa';
import * as jwt from 'jsonwebtoken';
import { User } from '../users/user';

export type LoginParams = Pick<User, 'userId' | 'email'>;
export type JwtLoginResponse = Pick<User, 'userId' | 'email'> & { jwtToken: string };

export class AuthService {
  public login(LoginParams: LoginParams, ctx: koa.Context) {
    ctx.session!.userId = LoginParams.userId;
    ctx.session!.email = LoginParams.email;
    return;
  }

  public logout(ctx: koa.Context) {
    ctx.session = null;
    return;
  }

  public view(ctx: koa.Context): LoginParams {
    return {
      userId: ctx.session!.userId,
      email: ctx.session!.email,
    };
  }

  public jwtLogin(LoginParams: LoginParams): JwtLoginResponse {
    const jwtToken: string = jwt.sign(
      {
        userId: LoginParams.userId,
        email: LoginParams.email,
        exp: 2000000000,
      },
      '[secret]',
      {
        noTimestamp: true,
      },
    );
    return {
      userId: LoginParams.userId,
      email: LoginParams.email,
      jwtToken,
    };
  }

  public jwtView(ctx: koa.Context): LoginParams {
    return {
      userId: ctx.state.userId,
      email: ctx.state.email,
    };
  }
}
