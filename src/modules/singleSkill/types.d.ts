import type { ISingleSkillEntity } from './entity';
import type mongoose from 'mongoose';

export interface ISingleSkill extends ISingleSkillEntity, mongoose.Document {
  _id: mongoose.Types.ObjectId;
}
