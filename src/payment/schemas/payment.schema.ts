import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
export const PaymentSchema = new mongoose.Schema({
  userId: { type: ObjectId, required: true, ref: 'User' },
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
});
