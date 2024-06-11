import mongoose from 'mongoose';
import * as enums from '../../enums';
import type { ICharacter } from './types';

export const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'character name not provided'],
  },
  race: {
    type: String,
    enum: enums.ENpcRace,
    required: [true, 'race not provided'],
    default: enums.EUserRace.Human,
  },
  lvl: {
    type: Number,
    required: false,
    default: 1,
  },
  exp: {
    type: Number,
    required: false,
    default: 1,
  },
  inventory: {
    type: mongoose.Types.ObjectId,
    required: false,
  },
  party: {
    type: mongoose.Types.ObjectId,
    required: false,
  },
  stats: {
    type: mongoose.Types.ObjectId,
    required: false,
  },
});

export default mongoose.model<ICharacter>('Character', characterSchema);
