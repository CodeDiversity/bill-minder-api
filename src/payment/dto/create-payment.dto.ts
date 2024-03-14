export class CreatePaymentDto {
  userId: string;
  billId: string;
  amount: number;
  date: Date;
  isRecurring?: boolean;
  paidAt: Date;
  isDeleted: boolean;
  updatedAt: Date;
}
