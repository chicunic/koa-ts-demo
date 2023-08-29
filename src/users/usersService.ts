import { User } from './user';

export type UserCreationParams = Pick<User, 'email' | 'name' | 'phoneNumbers'>;

export class UsersService {
  public get(userId: number, name?: string): User {
    return {
      userId,
      email: 'jane@doe.com',
      name: name ?? 'Jane Doe',
      status: 'Happy',
      phoneNumbers: [],
    };
  }

  public create(UserCreationParams: UserCreationParams): User {
    return {
      userId: Math.floor(Math.random() * 10000),
      status: 'Happy',
      ...UserCreationParams,
    };
  }
}
