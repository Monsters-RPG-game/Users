import type * as enums from '../../enums';
import type mongoose from 'mongoose';

export interface IProfileEntity {
  _id: string | mongoose.Types.ObjectId;
  user: string;
  race: enums.EUserRace;
  friends: string[];
  lvl: number;
  exp: number;
  initialized: boolean;
  inventory: string;
  stats: string;
  party: string;
  skills: string;
  state: enums.ECharacterState;
}
