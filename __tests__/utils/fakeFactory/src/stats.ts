import TemplateFactory from './abstracts';
import Stats from '../../../../src/modules/stats/model';
import type { IStatsEntity } from '../../../../src/modules/stats/entity';
import type { EFakeData } from '../enums';
import type { IAbstractBody } from '../types/data';

export default class FakeStats extends TemplateFactory<EFakeData.Stats> implements IAbstractBody<IStatsEntity> {
  constructor() {
    super(Stats);
  }

  _id(id?: string): this {
    this.data._id = id;
    return this;
  }

  owner(owner?: string): this {
    this.data.owner = owner;
    return this;
  }

  initialized(initialized?: boolean): this {
    this.data.initialized = initialized;
    return this;
  }

  intelligence(intelligence?: number): this {
    this.data.intelligence = intelligence;
    return this;
  }

  strength(strength?: number): this {
    this.data.strength = strength;
    return this;
  }

  protected override fillState(): void {
    this.data = {
      _id: undefined,
      owner: undefined,
      initialized: undefined,
      intelligence: undefined,
      strength: undefined,
    };
  }
}
