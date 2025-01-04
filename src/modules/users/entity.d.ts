import type mongoose from 'mongoose';

export interface IUserEntity {
  _id: string | mongoose.Types.ObjectId;
  login: string;
  oidcId: string;
}

export interface IUserDetails {
  _id: string;
  login: string;
}
