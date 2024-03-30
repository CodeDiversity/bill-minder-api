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
import { addMonths, addDays } from 'date-fns';
import { recurringCalculator } from './helpers/recurringCalculator';

@Injectable()
export class BillsService {
  constructor(
    @InjectModel('Bill') private billModel: Model<Bill>,
    private usersService: UsersService,
  ) { }
  create(createBillDto: CreateBillDto, userId: string) {
    const newBill = new this.billModel({
      ...createBillDto,
      userId,
    });
    return newBill.save();
  }

  addPaymentToBill(paymentId: string, billId: string) {
    return this.billModel.findByIdAndUpdate(
      new ObjectId(billId),
      { $push: { payments: paymentId } },
      { new: true },
    );
  }

  async findOne(id: string) {
    const bill = await this.billModel
      .findOne({
        _id: id,
        isDeleted: false,
      })
      .populate('payments')
      .exec();
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

  async deleteBillSoft(id: string) {
    const bill = await this.billModel.findByIdAndUpdate(
      new ObjectId(id),
      { isDeleted: true, deletedAt: new Date() },
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
      isDeleted: false,
    });
    if (!bills) {
      return [];
    }
    return bills;
  }

  async markBillAsPaid(id: string) {
    const bill = await this.findOne(id);
    if (!bill) {
      throw new Error('Bill not found');
    }
    if (bill.isRecurring) {
      const nextDueDate = recurringCalculator(
        bill.dueDate,
        bill.recurringFrequency,
      );
      return this.billModel.findByIdAndUpdate(
        new ObjectId(id),
        { isPaid: false, lastPaidAt: new Date(), dueDate: nextDueDate },
        { new: true },
      );
    } else {
      return this.billModel.findByIdAndUpdate(
        new ObjectId(id),
        { isPaid: true, lastPaidAt: new Date() },
        { new: true },
      );
    }
  }

  async getUserBills(id: string) {
    const userId = new ObjectId(id);
    const bills = await this.billModel
      .find({
        userId,
        isDeleted: false,
      })
      .populate('payments')
      .exec();

    // sort bills by due date
    bills.sort((a, b) => {
      return a.dueDate.getTime() - b.dueDate.getTime();
    });
    if (!bills) {
      return [];
    }
    return bills;
  }

  async getUpcomingBills(id: string) {
    const userId = new ObjectId(id);
    const now = new Date();
    const bills = await this.billModel
      .find({
        userId,
        dueDate: {
          $gte: now,
        },
        isDeleted: false,
      })
      .populate('payments')
      .limit(5)
      .exec();
    if (!bills) {
      return [];
    }
    return bills;
  }

  // once a month check for deleted bills and remove them from the database
  @Cron('0 0 1 * * *')
  async removeDeletedBills() {
    const bills = await this.billModel.find({
      isDeleted: true,
      deletedAt: {
        $lte: new Date(new Date().getTime() - 2592000000),
      },
    });
    if (bills.length > 0) {
      bills.forEach(async (bill) => {
        await this.billModel.findByIdAndDelete(bill._id);
      });
    }
  }

  @Cron('0 00 10 * * *')
  async sendBillReminders() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const now = new Date();
    const bills = await this.findBillsByDueDate();
    const dueBills = bills.filter((bill) => {
      // return bills that are due tomorrow
      return bill.dueDate.getDate() === addDays(now, 1).getDate();
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
