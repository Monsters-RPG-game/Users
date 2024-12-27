import mongoose from 'mongoose';
import type { IProfile } from './types.js';

export const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: [true, 'user not provided'],
    unique: true,
  },
  initialized: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const Profile = mongoose.model<IProfile>('Profile', profileSchema);
export default Profile;
