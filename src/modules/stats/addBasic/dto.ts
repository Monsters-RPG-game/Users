import Validation from '../../../tools/validation';
import type { IAddBasicStatsDto } from './types';

export default class AddBasicStatsDto implements IAddBasicStatsDto {
  owner: string;

  constructor(data: IAddBasicStatsDto) {
    this.owner = data.owner;

    this.validate();
  }

  private validate(): void {
    new Validation(this.owner, 'owner').isDefined().isString().isObjectId();
  }
}
