import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

export const PaymentSchema = new mongoose.Schema({
  userId: { type: ObjectId, required: true, ref: 'User' },
  bill: { type: ObjectId, required: true, ref: 'Bill' },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, required: true, default: false },
  deletedAt: { type: Date },
  isRecurring: { type: Boolean, required: true, default: false },
  recurringId: { type: ObjectId, ref: 'Recurring' },
  isPaid: { type: Boolean, required: true, default: false },
  paidAt: { type: Date },
  isAutoPay: { type: Boolean, required: true, default: false },
  autoPayId: { type: ObjectId, ref: 'AutoPay' },
  confirmationNumber: { type: String },
  note: { type: String },
});
