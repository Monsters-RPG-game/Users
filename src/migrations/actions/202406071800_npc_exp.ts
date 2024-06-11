import Npc from '../../modules/npc/model';
import type { QueryWithHelpers, UpdateWriteOpResult } from 'mongoose';

export default {
  async up(): Promise<QueryWithHelpers<UpdateWriteOpResult, unknown, unknown, unknown, 'updateMany'>> {
    return Npc.updateMany({ exp: { $exists: true } }, { $set: { exp: 1 } });
  },

  async down(): Promise<void> {
    await Npc.updateMany({}, { $set: { exp: [0, 10] } });
  },
};
