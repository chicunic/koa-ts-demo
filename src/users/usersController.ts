import { Body, Controller, Get, Path, Post, Query, Route, SuccessResponse, Tags } from 'tsoa';
import { User } from './user';
import { UsersService, UserCreationParams } from './usersService';

@Route('users')
@Tags('Users')
export class UsersController extends Controller {
  /**
   * @isLong userId
   * @example userId 123456
   * @example name "Jane Doe"
   */

  // GET /users/{userId}
  @Get('{userId}')
  public async getUser(@Path() userId: number, @Query() name?: string): Promise<User> {
    return new UsersService().get(userId, name);
  }

  // POST /users
  @SuccessResponse('201', 'Created')
  @Post()
  public async createUser(@Body() requestBody: UserCreationParams): Promise<void> {
    new UsersService().create(requestBody);
  }
}
