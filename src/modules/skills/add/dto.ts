import Validation from '../../../tools/validation';
import type { IAddSkillsDto } from './types';

export default class AddSkillsDto implements IAddSkillsDto {
  userId: string;
  constructor(data: IAddSkillsDto) {
    this.userId = data.userId;
    this.validate();
  }

  private validate(): void {
    new Validation(this.userId, 'userId').isDefined().isObject();
  }
}
