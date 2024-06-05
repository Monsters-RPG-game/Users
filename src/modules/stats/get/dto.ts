import Validation from '../../../tools/validation';
import type { IGetStatsDto } from './types';

export default class UserStatsDto implements IGetStatsDto {
  id?: string;
  character?: string;
  lvl?: number;

  constructor(data: IGetStatsDto) {
    this.id = data.id;
    this.character = data.character;
    this.lvl = data.lvl;
    this.validate();
  }

  private validate(): void {
    if (!this.character || this.id) new Validation(this.id, 'id').isDefined().isString().isObjectId();
    if (this.character) {
      new Validation(this.character, 'character').isDefined().isString();
      new Validation(this.lvl, 'lvl').isDefined().isNumber();
    }
  }
}
