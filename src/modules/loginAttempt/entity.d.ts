import type { ELoginOutput } from '../../enums/index.js';
import type mongoose from 'mongoose';

export interface ILoginAttemptEntity {
  _id: string | mongoose.Types.ObjectId;
  login: string;
  ip: string;
  output: ELoginOutput;
}
