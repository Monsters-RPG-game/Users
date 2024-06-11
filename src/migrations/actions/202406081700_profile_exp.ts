import Profile from '../../modules/profile/model';
import type { QueryWithHelpers, UpdateWriteOpResult } from 'mongoose';

export default {
  async up(): Promise<QueryWithHelpers<UpdateWriteOpResult, unknown, unknown, unknown, 'updateMany'>> {
    return Profile.updateMany({ exp: { $exists: true } }, { $set: { exp: 1 } });
  },

  async down(): Promise<void> {
    await Profile.updateMany({}, { $set: { exp: [0, 10] } });
  },
};
