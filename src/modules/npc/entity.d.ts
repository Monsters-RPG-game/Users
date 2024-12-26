import type * as enums from '../../enums';
import type mongoose from 'mongoose';

export interface ICharacterEntity {
  _id: string | mongoose.Types.ObjectId;
  name: string;
  race: enums.ENpcRace;
  lvl: number;
  exp: number;
  inventory: string;
  stats: string;
  party: string;
}
