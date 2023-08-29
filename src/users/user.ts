export interface User {
  /**
   * @isLong ErrorMessage
   * @minimum 1
   */
  userId: number;
  email: string;
  name: string;
  status?: 'Happy' | 'Sad';
  phoneNumbers: string[];
}
