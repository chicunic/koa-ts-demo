export interface User {
  /**
   * @isLong ErrorMessage
   * @minimum 1
   * @example 123456
   */
  userId: number;
  /**
   * @isEmail
   * @example "jane@doe.com"
   */
  email: string;
  /**
   * @example "Jane Doe"
   */
  name: string;
  /**
   * @isIn Happy,Sad
   * @example "Happy"
   * @default "Happy"
   */
  status?: 'Happy' | 'Sad';
  /**
   * @example []
   */
  phoneNumbers: string[];
}
