import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Payment } from './entities/payment.entity';
import { BillsService } from 'src/bills/bills.service';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel('Payment') private paymentModel: Model<Payment>,
    private billService: BillsService,
  ) {}
  async create(createPaymentDto: CreatePaymentDto, userId) {
    const payment = await this.paymentModel.create({
      ...createPaymentDto,
      userId,
    });
    const paymentId = payment._id.toString();
    await this.addPaymentToBill(paymentId, createPaymentDto.bill);
    return payment;
  }

  findAllByUserId(userId: string) {
    return this.paymentModel.find({ userId });
  }

  addPaymentToBill(paymentId: string, billId: string) {
    return this.billService.addPaymentToBill(paymentId, billId);
  }

  // findAll() {
  //   return `This action returns all payment`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} payment`;
  // }

  // update(id: number, updatePaymentDto: UpdatePaymentDto) {
  //   return `This action updates a #${id} payment`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} payment`;
  // }
}
