import Validation from '../../../tools/validation';
import type { IAddSkillsDto } from './types';

export default class AddSkillsDto implements IAddSkillsDto {
  owner: string;
  constructor(data: IAddSkillsDto) {
    this.owner = data.owner;
    this.validate();
  }

  private validate(): void {
    new Validation(this.owner, 'owner').isDefined().isObjectId();
  }
}
