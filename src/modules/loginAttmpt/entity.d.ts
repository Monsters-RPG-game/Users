import type { ELoginOutput } from '../../enums';
import type mongoose from 'mongoose';

export interface ILoginAttemptEntity {
  _id: string | mongoose.Types.ObjectId;
  login: string;
  ip: string;
  output: ELoginOutput;
}
