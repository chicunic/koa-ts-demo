export interface User {
  /**
   * @isLong ErrorMessage
   */
  id: number;
  email: string;
  name: string;
  status?: 'Happy' | 'Sad';
  phoneNumbers: string[];
}
