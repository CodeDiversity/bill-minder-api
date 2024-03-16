import { Payment } from 'src/payment/entities/payment.entity';

export class Bill {
  userId: string;
  name: string;
  amount: number;
  dueDate: Date;
  isPaid: boolean;
  created: Date;
  isRecurring: boolean;
  category: string;
  createdAt: Date;
  lastPaidAt: Date;
  isDeleted: boolean;
  deletedAt: Date;
  payLink: string;
  payments: Payment[];
}
