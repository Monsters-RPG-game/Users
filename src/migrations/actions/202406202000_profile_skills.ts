import Profile from '../../modules/profile/model';
import SkillsRooster from '../../modules/skills/rooster';

export default {
  async up(): Promise<number> {
    const toChange = await Profile.find({ skills: { $exists: false } }).lean();
    let counter: number = 0;
    await Promise.all(
      toChange.map(async (e) => {
        const skillsId = await new SkillsRooster().addDefault({ owner: e.user.toString() });
        await Profile.updateOne({ _id: e._id }, { skills: skillsId });
        counter++;
      }),
    );
    return counter;
  },

  async down(): Promise<void> {
    await Profile.updateMany({}, { $unset: { skills: 1 } });
  },
};
