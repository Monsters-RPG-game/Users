import { ESkillsType, ESkillTarget } from '../../../enums';
import Validation from '../../../tools/validation';
import type { IAddSingleSkillDto } from './types';

export default class AddSingleSkillDto implements IAddSingleSkillDto {
  name: string;
  power: number;
  type: ESkillsType;
  target: ESkillTarget;

  constructor(data: IAddSingleSkillDto) {
    this.name = data.name;
    this.type = data.type;
    this.power = data.power;
    this.target = data.target;

    this.validate();
  }

  private validate(): void {
    new Validation(this.name, 'name').isDefined().isString();
    new Validation(this.type, 'type').isDefined().isPartOfEnum(ESkillsType);
    new Validation(this.target, 'target').isDefined().isPartOfEnum(ESkillTarget);
    new Validation(this.power, 'power').isDefined().isNumber();
  }
}
