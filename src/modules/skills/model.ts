import mongoose from 'mongoose';
// import * as enums from '../../enums';
// import { singleSkillSchema } from '../../modules/singleSkill/model';
import type { ISkills } from './types';

const singleSkillSchema = new mongoose.Schema({
  skillId: {
    type: mongoose.Types.ObjectId,
    required: [true, 'skillId not provided'],
  },
});

const skillsSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Types.ObjectId,
    required: [true, 'userId not provided'],
    unique: true,
  },
  singleSkills: {
    type: [singleSkillSchema],
    default: [],
  },
});

const Skills = mongoose.model<ISkills>('Skills', skillsSchema);
export default Skills;
