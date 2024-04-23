import { ENpcRace } from '../../../enums';
import Validation from '../../../tools/validation';
import type { IAddStatsDto } from './types';

export default class AddStatsDto implements IAddStatsDto {
  race: ENpcRace;

  constructor(data: IAddStatsDto) {
    this.race = data.race;

    this.validate();
  }

  private validate(): void {
    new Validation(this.race, 'race').isDefined().isPartOfEnum(ENpcRace);
  }
}
