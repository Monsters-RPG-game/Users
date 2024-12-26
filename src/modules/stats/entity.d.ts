import type mongoose from 'mongoose';

export interface ICharacterStats {
  intelligence: number;
  strength: number;
  hp: number;
}

export interface IStatsEntity extends ICharacterStats {
  _id: string | mongoose.Types.ObjectId;
  owner: string | mongoose.Types.ObjectId;
  initialized: boolean;
}
