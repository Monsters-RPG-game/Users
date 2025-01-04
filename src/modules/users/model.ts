import mongoose from 'mongoose';
import type { IUser } from './types.js';

export const userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: [true, 'Login not provided'],
  },
  oidcId: {
    type: String,
    required: [true, 'User not provided'],
  },
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
