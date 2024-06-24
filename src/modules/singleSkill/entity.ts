import type * as enums from '../../enums';

export interface ISingleSkillEntity {
  _id: string;
  name: string;
  power: number;
  type: enums.ESkillsType;
  target: enums.ESkillTarget;
}
