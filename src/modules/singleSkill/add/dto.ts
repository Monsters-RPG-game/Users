import { ESkillsType } from '../../../enums';
import Validation from '../../../tools/validation';
import type { IAddSingleSkillDto } from './types';

export default class AddSingleSkillDto implements IAddSingleSkillDto {
  name: string;
  power: number;
  type: ESkillsType;

  constructor(data: IAddSingleSkillDto) {
    this.name = data.name;
    this.type = data.type;
    this.power = data.power;

    this.validate();
  }

  private validate(): void {
    new Validation(this.name, 'name').isDefined().isString();
    new Validation(this.type, 'type').isDefined().isPartOfEnum(ESkillsType);
    new Validation(this.power, 'power').isDefined().isNumber();
  }
}
