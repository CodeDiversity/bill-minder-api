import { ObjectId } from 'mongoose';

export class Payment {
  userId: ObjectId;
  bill: ObjectId;
  amount: number;
  date: Date;
  createdAt: Date;
  isDeleted: boolean;
  deletedAt: Date;
  isRecurring: boolean;
  recurringId: ObjectId;
  isPaid: boolean;
  paidAt: Date;
  isAutoPay: boolean;
  autoPayId: ObjectId;
  confirmationNumber: string;
  note: string;
}
