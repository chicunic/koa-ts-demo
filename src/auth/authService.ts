import * as koa from 'koa';
import { User } from '../users/user';

export type UserLoginParams = Pick<User, 'userId' | 'email'>;
export type UserViewResponse = Pick<User, 'userId' | 'email'>;

export class AuthService {
  public login(UserLoginParams: UserLoginParams, ctx: koa.Context) {
    ctx.session!.userId = UserLoginParams.userId;
    ctx.session!.email = UserLoginParams.email;
    return;
  }

  public logout(ctx: koa.Context) {
    ctx.session = null;
    return;
  }

  public view(ctx: koa.Context): UserViewResponse {
    if (!ctx.session!.userId) {
      ctx.throw(401, 'Unauthorized');
    }
    return {
      userId: ctx.session!.userId,
      email: ctx.session!.email,
    };
  }
}
