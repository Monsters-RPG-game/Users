import type { ENpcRace } from '../../../enums';

export interface IAddBasicCharacterDto {
  name: string;
  race: ENpcRace;
  lvl: number;
}
