import { ENpcRace } from '../../../enums';
import Validation from '../../../tools/validation';
import type { IAddBasicCharacterDto } from './types';

export default class AddBasicCharacterDto implements IAddBasicCharacterDto {
  name: string;
  race: ENpcRace;
  lvl: number;

  constructor(data: IAddBasicCharacterDto) {
    this.name = data.name;
    this.lvl = data.lvl;
    this.race = data.race;

    this.validate();
  }

  private validate(): void {
    new Validation(this.lvl, 'lvl').isDefined().isNumber();
    new Validation(this.name, 'name').isDefined().isString();
    new Validation(this.race, 'race').isDefined().isString().isPartOfEnum(ENpcRace);
  }
}
