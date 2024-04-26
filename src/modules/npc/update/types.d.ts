import type { ENpcRace } from '../../../enums';

export interface IUpdateCharacterDto {
  lvl?: number;
  race?: ENpcRace;
  name?: string;
  id: string;
}
