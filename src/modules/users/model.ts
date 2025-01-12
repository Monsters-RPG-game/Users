import mongoose from 'mongoose';
import { EDbCollections } from '../../enums/index.js';
import type { IUser } from './types.js';

export const userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: [true, 'Login not provided'],
  },
  oidcId: {
    type: String,
    required: [true, 'Oidc not provided'],
  },
});

const User = mongoose.model<IUser>('User', userSchema, EDbCollections.Users);
export default User;
