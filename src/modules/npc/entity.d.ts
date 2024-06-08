import type * as enums from '../../enums';

export interface ICharacterEntity {
  _id: string;
  name: string;
  race: enums.ENpcRace;
  lvl: number;
  exp: number;
  inventory: string;
  stats: string;
  party: string;
}
