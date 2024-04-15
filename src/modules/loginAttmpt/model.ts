import mongoose from 'mongoose';
import * as enums from '../../enums';
import type { ILoginAttempt } from './types';

export const loginAttemptSchema = new mongoose.Schema({
  login: {
    type: String,
    required: [true, 'Login not provided'],
  },
  ip: {
    type: String,
    required: [true, 'Ip not provided'],
  },
  output: {
    type: String,
    enum: enums.ELoginOutput,
    required: [true, 'Output not provided'],
  },
});

const LoginAttempt = mongoose.model<ILoginAttempt>('LoginAttempt', loginAttemptSchema);
export default LoginAttempt;
