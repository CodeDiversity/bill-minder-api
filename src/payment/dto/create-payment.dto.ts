export class CreatePaymentDto {
  bill: string;
  amount: number;
  date: Date;
  isRecurring?: boolean;
  paidAt?: Date;
  confirmationNumber?: string;
  note?: string;
}
