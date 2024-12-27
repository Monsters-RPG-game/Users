import type * as enums from '../../enums/index.js';
import type mongoose from 'mongoose';

export interface IUserEntity {
  _id: string | mongoose.Types.ObjectId;
  login: string;
  email: string;
  verified: boolean;
  password: string;
  type: enums.EUserTypes;
}

export interface IUserDetails {
  _id: string;
  login: string;
  verified: boolean;
  type: enums.EUserTypes;
}
