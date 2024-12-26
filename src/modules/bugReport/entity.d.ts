import type mongoose from 'mongoose';

export interface IBugReportEntity {
  _id: string | mongoose.Types.ObjectId;
  message: string;
  sender: string;
}
