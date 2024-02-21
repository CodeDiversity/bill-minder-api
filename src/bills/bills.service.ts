import { Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Bill } from './entities/bill.entity';

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

  findOne(id: number) {
    return `This action returns a #${id} bill`;
  }

  update(id: number, updateBillDto: UpdateBillDto) {
    return `This action updates a #${id} bill`;
  }

  remove(id: number) {
    return `This action removes a #${id} bill`;
  }
}
