import type mongoose from 'mongoose';

export interface IProfileEntity {
  _id: string | mongoose.Types.ObjectId;
  user: string;
}
