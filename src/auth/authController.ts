import * as koa from 'koa';
import { Body, Controller, Get, Post, Route, Request, SuccessResponse } from 'tsoa';
import { AuthService, UserLoginParams, UserViewResponse } from './authService';

@Route('auth')
export class AuthController extends Controller {
  /**
   * @isLong userId
   */

  // POST /auth/login
  @SuccessResponse('200', 'OK')
  @Post('login')
  public async login(@Body() requestBody: UserLoginParams, @Request() request: koa.Request): Promise<void> {
    this.setStatus(200);
    new AuthService().login(requestBody, request.ctx);
    return;
  }

  // POST /auth/logout
  @SuccessResponse('200', 'OK')
  @Post('logout')
  public async logout(@Request() request: koa.Request): Promise<void> {
    this.setStatus(200);
    new AuthService().logout(request.ctx);
    return;
  }

  // GET /auth/view
  @SuccessResponse('200', 'OK')
  @Get('view')
  public async view(@Request() request: koa.Request): Promise<UserViewResponse> {
    this.setStatus(200);
    return new AuthService().view(request.ctx);
  }
}
