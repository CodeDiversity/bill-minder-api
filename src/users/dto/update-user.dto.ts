export class UpdateUserDto {
  readonly email?: string;
  readonly username?: string;
  readonly password?: string;
  readonly fullName?: string;
  readonly categories?: string[];
  readonly phoneNumber?: string;
  readonly role?: string;
  readonly verified?: boolean;
  readonly currency?: string;
  readonly emailReminderTime?: string;
}
