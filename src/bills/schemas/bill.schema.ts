import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { RecurringFrequency } from '../entities/bill.entity';

export const BillSchema = new mongoose.Schema({
  userId: { type: ObjectId, required: true, ref: 'User' },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date },
  isPaid: { type: Boolean, required: true, default: false },
  created: { type: Date, default: Date.now },
  isRecurring: { type: Boolean, required: true, default: false },
  category: { type: String },
  payLink: { type: String },
  createdAt: { type: Date, default: Date.now },
  lastPaidAt: { type: Date },
  isDeleted: { type: Boolean, required: true, default: false },
  deletedAt: { type: Date },
  payments: [{ type: ObjectId, ref: 'Payment' }],
  recurringFrequency: { type: String, default: RecurringFrequency.MONTHLY },
});
