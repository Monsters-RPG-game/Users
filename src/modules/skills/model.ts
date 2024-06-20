import mongoose from 'mongoose';
import * as enums from '../../enums';
import type { ISkills } from './types';

const singleSkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name not provided'],
  },
  power: {
    type: Number,
    required: [true, 'power not provided'],
    default: 1,
  },
  type: {
    type: String,
    enum: enums.ESkillsType,
    required: [true, 'type not provided'],
    default: enums.ESkillsType.Attack,
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
