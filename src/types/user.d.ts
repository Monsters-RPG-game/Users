import type * as enums from '../enums';
import type mongoose from 'mongoose';

export interface IUser extends IUserLean, mongoose.Document {
  _id: mongoose.Types.ObjectId;
}

export interface IUserLean {
  _id: string;
  login: string;
  email: string;
  verified: boolean;
  password: string;
  type: enums.EUserTypes;
}

export interface ILocalUser {
  userId: string | undefined;
  tempId: string;
  validated: boolean;
  type: enums.EUserTypes;
}

export interface IUserCredentials {
  accessToken: string;
  refreshToken: string;
  userId: string;
}

export interface IUserId {
  id: string;
}
