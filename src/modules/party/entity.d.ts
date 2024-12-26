import type mongoose from 'mongoose';

export interface IPartyEntity {
  _id: string | mongoose.Types.ObjectId;
  leader: string;
  characters: string[];
}
