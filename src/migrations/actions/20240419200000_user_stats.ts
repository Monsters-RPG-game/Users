import Profile from '../../modules/profile/model';
import StatsRooster from '../../modules/stats/rooster';

export default {
  async up(): Promise<void> {
    const toChange = await Profile.find({ stats: { $exists: false } }).lean();
    await Promise.all(
      toChange.map(async (e) => {
        const statsId = await new StatsRooster().addDefault({ owner: e.user });
        await Profile.updateOne({ _id: e._id }, { stats: statsId });
      }),
    );
  },

  async down(): Promise<void> {
    await Profile.updateMany({}, { $unset: { stats: 1 } });
  },
};
