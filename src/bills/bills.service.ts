import { Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Bill } from './entities/bill.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class BillsService {
  constructor(@InjectModel('Bill') private billModel: Model<Bill>) {}
  create(createBillDto: CreateBillDto, userId: string) {
    const newBill = new this.billModel({
      ...createBillDto,
      userId,
    });
    return newBill.save();
  }

  findAll() {
    return `This action returns all bills`;
  }

  async findOne(id: string) {
    const bill = await this.billModel.findById(new ObjectId(id));
    if (!bill) {
      throw new Error('Bill not found');
    }
    return bill;
  }

  async update(id: string, updateBillDto: UpdateBillDto) {
    const bill = await this.billModel.findByIdAndUpdate(
      new ObjectId(id),
      updateBillDto,
      { new: true },
    );
    if (!bill) {
      throw new Error('Bill not found');
    }
    return bill;
  }

  markBillAsPaid(id: string) {
    const bill = this.billModel.findByIdAndUpdate(
      new ObjectId(id),
      { isPaid: true, lastPaidAt: new Date() },
      { new: true },
    );
    if (!bill) {
      throw new Error('Bill not found');
    }
    return bill;
  }
}
