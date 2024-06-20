import mongoose from 'mongoose';
import * as enums from '../../enums';
import type { ISingleSkill } from './types';

export const singleSkillSchema = new mongoose.Schema({
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
  target: {
    type: String,
    enum: enums.ESkillTarget,
    required: [true, 'type not provided'],
    default: enums.ESkillTarget.Enemy,
  },
});

const SingleSkill = mongoose.model<ISingleSkill>('SingleSkill', singleSkillSchema);
export default SingleSkill;
