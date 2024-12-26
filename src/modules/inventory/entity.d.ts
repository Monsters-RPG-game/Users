import type { IInventoryItem } from './types';
import type mongoose from 'mongoose';

export interface IInventoryEntity {
  _id: string | mongoose.Types.ObjectId;
  userId: string;
  items: IInventoryItem[];
}
