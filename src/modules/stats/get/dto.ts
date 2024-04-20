import Validation from '../../../tools/validation';
import type { IGetStatsDto } from './types';

export default class UserStatsDto implements IGetStatsDto {
  id: string;

  constructor(data: IGetStatsDto) {
    this.id = data.id;

    this.validate();
  }

  private validate(): void {
    new Validation(this.id, 'id').isDefined().isString().isObjectId();
  }
}
