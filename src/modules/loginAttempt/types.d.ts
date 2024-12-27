import type { ILoginAttemptEntity } from './entity.js';
import type mongoose from 'mongoose';

export interface ILoginAttempt extends ILoginAttemptEntity, mongoose.Document {
  _id: mongoose.Types.ObjectId;
}
