import mongoose from 'mongoose';
import type { IStats } from './types';

export const statsSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Types.ObjectId,
    required: [true, 'owner not provided'],
    unique: true,
  },
  initialized: {
    type: Boolean,
    default: false,
  },
  strength: {
    type: Number,
    default: 1,
  },
  intelligence: {
    type: Number,
    default: 1,
  },
  hp: {
    type: Number,
    default: 10,
  },
});

const Stats = mongoose.model<IStats>('Stats', statsSchema);
export default Stats;
