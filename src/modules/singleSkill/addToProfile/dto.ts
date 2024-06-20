import Validation from '../../../tools/validation';
import type { IAddToProfileDto } from './types';

export default class AddSingleSkillDto implements IAddToProfileDto {
  profileId: string;
  singleSkillId: string;

  constructor(data: IAddToProfileDto) {
    this.profileId = data.profileId;
    this.singleSkillId = data.singleSkillId;
    this.validate();
  }

  private validate(): void {
    new Validation(this.profileId, 'profileId').isDefined().isString();
    new Validation(this.singleSkillId, 'singleSkillId').isDefined().isString();
  }
}
