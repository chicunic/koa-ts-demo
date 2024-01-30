import * as koa from 'koa';
import { Body, Controller, Example, Get, Post, Route, Request, Response, Security, Tags } from 'tsoa';
import { AuthService, LoginParams, JwtLoginResponse } from './authService';

@Route('auth')
@Tags('Auth')
export class AuthController extends Controller {
  // POST /auth/login
  @Response('401', 'Unauthorized')
  @Post('login')
  public async login(@Body() requestBody: LoginParams, @Request() request: koa.Request): Promise<void> {
    new AuthService().login(requestBody, request.ctx);
  }

  // POST /auth/logout
  @Security('session')
  @Response('401', 'Unauthorized')
  @Post('logout')
  public async logout(@Request() request: koa.Request): Promise<void> {
    new AuthService().logout(request.ctx);
  }

  // GET /auth/view
  @Security('session')
  @Response('401', 'Unauthorized')
  @Get('view')
  public async view(@Request() request: koa.Request): Promise<LoginParams> {
    return new AuthService().view(request.ctx);
  }

  // POST /auth/jwt/login
  @Post('jwt/login')
  @Example<JwtLoginResponse>({
    userId: 123456,
    email: 'jane@doe.com',
    jwtToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMzQ1NiwiZW1haWwiOiJqYW5lQGRvZS5jb20iLCJleHAiOjIwMDAwMDAwMDB9.cvJH417RUw0BOXfA2f_MS7vZmEU7-HOOCU0g90RHkHs',
  })
  public async jwtLogin(@Body() requestBody: LoginParams): Promise<JwtLoginResponse> {
    return new AuthService().jwtLogin(requestBody);
  }

  // GET /auth/jwt/view
  /**
   * Put the JWT token in the Authorization header as a Bearer token. Here are some examples:
   *
   * Normal:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMzQ1NiwiZW1haWwiOiJqYW5lQGRvZS5jb20iLCJleHAiOjIwMDAwMDAwMDB9.cvJH417RUw0BOXfA2f_MS7vZmEU7-HOOCU0g90RHkHs
   *
   * Expired: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMzQ1NiwiZW1haWwiOiJqYW5lQGRvZS5jb20iLCJleHAiOjEwMDAwMDAwMDB9.ZG0qpjHsSPaE2VFdugVqSLMYxEj9dlDOEf9nQuyYkgQ
   */
  @Security('jwt', [])
  @Response('401', 'Unauthorized')
  @Get('jwt/view')
  public async jwtView(@Request() request: koa.Request): Promise<LoginParams> {
    return new AuthService().jwtView(request.ctx);
  }
}
