import TemplateFactory from './abstracts';
import Skills from '../../../../src/modules/skills/model';
import type { ISkillsEntity } from '../../../../src/modules/skills/entity';
import type { ISingleSkill } from '../../../../src/modules/skills/types';
import type { EFakeData } from '../enums';
import type { IAbstractBody } from '../types/data';

export default class FakeSkills extends TemplateFactory<EFakeData.Skills> implements IAbstractBody<ISkillsEntity> {
  constructor() {
    super(Skills);
  }

  _id(id?: string): this {
    this.data._id = id;
    return this;
  }

  owner(owner?: string): this {
    this.data.owner = owner;
    return this;
  }

  singleSkills(singleSkills?: ISingleSkill[]): this {
    this.data.singleSkills = singleSkills;
    return this;
  }
  protected override fillState(): void {
    this.data = {
      _id: undefined,
      owner: undefined,
      singleSkills: [],
    };
  }
}
