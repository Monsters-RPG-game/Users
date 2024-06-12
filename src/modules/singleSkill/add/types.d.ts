import type * as enums from '../../../enums';

export interface IAddSingleSkillDto {
  name: string;
  power: number;
  type: enums.ESkillsType;
}
