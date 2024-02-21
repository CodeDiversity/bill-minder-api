import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsBoolean,
} from 'class-validator';

export class CreateBillDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  amount: number;

  dueDate: Date;

  @IsBoolean()
  isPaid: boolean;
  created: Date;

  @IsBoolean()
  isRecurring: boolean;

  @IsString()
  @IsNotEmpty()
  category: string;

  createdAt: Date;

  lastPaidAt: Date;
}
