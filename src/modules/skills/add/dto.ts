import Validation from '../../../tools/validation';
import type { IAddSkillsDto } from './types';

export default class AddSkillsDto implements IAddSkillsDto {
  owner: string;
  singleSkillId: string;

  constructor(data: IAddSkillsDto) {
    this.owner = data.owner;
    this.singleSkillId = data.singleSkillId;
    this.validate();
  }

  private validate(): void {
    new Validation(this.owner, 'owner').isDefined().isString().isObjectId();
    new Validation(this.singleSkillId, 'singleSkillId').isDefined().isString().isObjectId();
  }
}
