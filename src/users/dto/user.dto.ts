import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;
  @Expose()
  email: string;
  @Expose()
  username: string;
  @Expose()
  fullName: string;
  @Expose()
  categories: string[];
  @Expose()
  phoneNumber: string;
  @Expose()
  role: string;
  @Expose()
  verified: boolean;
  @Expose()
  currency: string;
  @Expose()
  emailReminderTime: string;
  @Expose()
  created: Date;
}
