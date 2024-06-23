import TemplateFactory from './abstracts';
import SingleSkill from '../../../../src/modules/singleSkill/model';
import type { ESkillTarget, ESkillsType } from '../../../../src/enums/skills';
import type { ISingleSkillEntity } from '../../../../src/modules/singleSkill/entity';
import type { EFakeData } from '../enums';
import type { IAbstractBody } from '../types/data';

export default class FakeSingleSkill
  extends TemplateFactory<EFakeData.SingleSkill>
  implements IAbstractBody<ISingleSkillEntity>
{
  constructor() {
    super(SingleSkill);
  }

  _id(id?: string): this {
    this.data._id = id;
    return this;
  }

  name(name?: string): this {
    this.data.name = name;
    return this;
  }

  power(power?: number): this {
    this.data.power = power;
    return this;
  }

  type(type?: ESkillsType): this {
    this.data.type = type;
    return this;
  }

  target(target?: ESkillTarget): this {
    this.data.target = target;
    return this;
  }

  protected override fillState(): void {
    this.data = {
      _id: undefined,
      name: undefined,
      power: undefined,
      type: 'attack' as ESkillsType,
      target: 'enemy' as ESkillTarget,
    };
  }
}
