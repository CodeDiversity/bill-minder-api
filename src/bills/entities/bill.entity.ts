import { Payment } from 'src/payment/entities/payment.entity';

export enum RecurringFrequency {
  WEEKLY = 'WEEKLY',
  BIWEEKLY = 'BIWEEKLY',
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  SEMIANNUALLY = 'SEMIANNUALLY',
  ANNUALLY = 'ANNUALLY',
  BIMONTHLY = 'BIMONTHLY',
}

export class Bill {
  userId: string;
  name: string;
  amount: number;
  dueDate: Date;
  isPaid: boolean;
  created: Date;
  isRecurring: boolean;
  recurringFrequency?: RecurringFrequency;
  category: string;
  createdAt: Date;
  lastPaidAt: Date;
  isDeleted: boolean;
  deletedAt: Date;
  payLink: string;
  payments: Payment[];
}
