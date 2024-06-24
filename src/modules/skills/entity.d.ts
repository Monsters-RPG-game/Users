import type { ISingleSkill } from './types';

export interface ISkillsEntity {
  _id: string;
  owner: string;
  singleSkills: ISingleSkill[];
}
