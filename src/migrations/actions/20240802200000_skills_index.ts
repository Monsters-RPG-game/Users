import Skills from '../../modules/skills/model';

export default {
  async up(): Promise<number> {
    await Skills.collection.dropIndex("singleSkills.skillId_1")
    return 1
  },

  async down(): Promise<void> {
    await Skills.collection.createIndex("singleSkills.skillId_1")
  },
};
