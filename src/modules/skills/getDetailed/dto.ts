import Validation from '../../../tools/validation';
import type { IGetDetailedSkillsDto } from './types';

export default class GetSkillsDto implements IGetDetailedSkillsDto {
  id: string;

  constructor(data: IGetDetailedSkillsDto) {
    this.id = data.id;

    this.validate();
  }

  private validate(): void {
    new Validation(this.id, 'id').isDefined().isString().isObjectId();
  }
}
