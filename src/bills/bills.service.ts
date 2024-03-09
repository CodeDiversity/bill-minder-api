import { Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Bill } from './entities/bill.entity';
import { ObjectId } from 'mongodb';
import { Cron } from '@nestjs/schedule';
import { UsersService } from 'src/users/users.service';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class BillsService {
  constructor(
    @InjectModel('Bill') private billModel: Model<Bill>,
    private usersService: UsersService,
  ) {}
  create(createBillDto: CreateBillDto, userId: string) {
    const newBill = new this.billModel({
      ...createBillDto,
      userId,
    });
    return newBill.save();
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

  async findBillsByDueDate() {
    const now = new Date();
    // find bills that are due within the next 48 hours
    const bills = await this.billModel.find({
      dueDate: {
        $gte: now,
        $lte: new Date(now.getTime() + 172800000),
      },
    });
    if (!bills) {
      return [];
    }
    return bills;
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

  async getUserBills(id: string) {
    console.log('id', id);
    const userId = new ObjectId(id);
    const bills = await this.billModel.find({ userId });
    // sort bills by due date
    bills.sort((a, b) => {
      return a.dueDate.getTime() - b.dueDate.getTime();
    });
    if (!bills) {
      return [];
    }
    return bills;
  }

  @Cron('0 30 8 * * *')
  async sendBillReminders() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const now = new Date();
    const bills = await this.findBillsByDueDate();
    const dueBills = bills.filter((bill) => {
      // 24 hours in milliseconds
      return bill.dueDate.getTime() - now.getTime() < 86400000;
    });
    if (dueBills.length > 0) {
      // for each bill, find the users email address and send a reminder
      dueBills.forEach(async (bill) => {
        const user = await this.usersService.findByUserId(bill.userId);
        const msg = {
          to: user.email,
          from: 'rainbowdevs22@gmail.com',
          subject: `Bill Reminder: ${bill.name}`,
          html: `<strong>This is a reminder that your bill ${bill.name} is due on ${bill.dueDate}</strong>`,
        };
        sgMail
          .send(msg)
          .then(() => {
            console.log(`Email sent to ${user}`);
          })
          .catch((error) => {
            console.error(error);
          });
      });
    }
  }
}
