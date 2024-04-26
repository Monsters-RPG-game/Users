import { ENpcRace } from '../../../enums';
import Validation from '../../../tools/validation';
import type { IUpdateCharacterDto } from './types';

export default class UpdateCharacterDto implements IUpdateCharacterDto {
  race?: ENpcRace;
  lvl?: number;
  name?: string;
  id: string;

  constructor(data: IUpdateCharacterDto) {
    this.race = data.race;
    this.lvl = data.lvl;
    this.name = data.name;
    this.id = data.id;

    this.validate();
  }

  private validate(): void {
    if (this.race) new Validation(this.race, 'race').isDefined().isPartOfEnum(ENpcRace);
    if (this.name) new Validation(this.name, 'name').isDefined().isString();
    if (this.lvl) new Validation(this.lvl, 'lvl').isDefined().isNumber();
    new Validation(this.id, 'id').isDefined().isObjectId();
  }
}
