import { Document } from 'mongoose';

export interface User extends Document {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  created?: Date;
}
