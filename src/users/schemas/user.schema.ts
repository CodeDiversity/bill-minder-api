import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  created: { type: Date, default: Date.now },
  categories: {
    type: [String],
    default: [
      'Housing',
      'Transportation',
      'Food',
      'Utilities',
      'Insurance',
      'Healthcare',
      'Savings',
      'Debt',
      'Personal',
      'Recreation',
      'Miscellaneous',
    ],
  },
});
