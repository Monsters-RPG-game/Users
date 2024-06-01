import Stats from '../../modules/stats/model';
import type { QueryWithHelpers, UpdateWriteOpResult } from 'mongoose';

export default {
  async up(): Promise<QueryWithHelpers<UpdateWriteOpResult, unknown, unknown, unknown, 'updateMany'>> {
    return Stats.updateMany({ hp: { $exists: false } }, { $set: { hp: 10 } });
  },

  async down(): Promise<void> {
    await Stats.updateMany({}, { $unset: { hp: '' } });
  },
};
