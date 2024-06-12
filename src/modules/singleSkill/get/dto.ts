import Validation from '../../../tools/validation';
import type { IGetSingleSkillDto } from './types';

export default class GetSingleSkillDto implements IGetSingleSkillDto {
  id: string;

  constructor(data: IGetSingleSkillDto) {
    this.id = data.id;

    this.validate();
  }

  private validate(): void {
    new Validation(this.id, 'id').isDefined().isString().isObjectId();
  }
}
