import { ENpcRace } from '../../../enums';
import Validation from '../../../tools/validation';
import type { IGetCharacterDto } from './types';

export default class GetCharacterDto implements IGetCharacterDto {
  race?: ENpcRace;
  lvl?: number;
  page: number;
  id?: string[];

  constructor(data: IGetCharacterDto) {
    this.race = data.race;
    this.lvl = data.lvl;
    this.page = data.page;
    this.id = data.id;

    this.validate();
  }

  private validate(): void {
    if (this.lvl) new Validation(this.lvl, 'lvl').isDefined().isNumber();
    if (this.race) new Validation(this.race, 'race').isDefined().isString().isPartOfEnum(ENpcRace);
    if (this.id) new Validation(this.id, 'id').isDefined().isObjectIdArray();
    new Validation(this.page, 'page').isDefined().isNumber();
  }
}
