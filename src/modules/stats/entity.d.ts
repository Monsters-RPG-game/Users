export interface ICharacterStats {
  intelligence: number;
  strength: number;
}

export interface IStatsEntity extends ICharacterStats {
  _id: string;
  owner: string;
  initialized: boolean;
}
