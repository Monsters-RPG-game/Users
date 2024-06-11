import Validation from '../../../tools/validation';
import type { IAddBasicSkillsDto } from './types';

export default class AddBasicSkillsDto implements IAddBasicSkillsDto {
  owner: string;

  constructor(data: IAddBasicSkillsDto) {
    this.owner = data.owner;

    this.validate();
  }

  private validate(): void {
    new Validation(this.owner, 'owner').isDefined().isString().isObjectId();
  }
}
