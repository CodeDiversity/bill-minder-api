import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  created: { type: Date, default: Date.now },
});
