import TemplateFactory from './abstracts.js';
import Profile from '../../../../src/modules/profile/model.js';
import type { IProfileEntity } from '../../../../src/modules/profile/entity.js';
import type { EFakeData } from '../enums/index.js';
import type { IAbstractBody } from '../types/data.js';
import mongoose from 'mongoose';

export default class FakeProfile extends TemplateFactory<EFakeData.Profile> implements IAbstractBody<IProfileEntity> {
  constructor() {
    super(Profile);
  }

  _id(id?: string | mongoose.Types.ObjectId): this {
    this.data._id = id;
    return this;
  }

  user(user?: string): this {
    this.data.user = user;
    return this;
  }

  initialized(initialized?: boolean): this {
    this.data.initialized = initialized;
    return this;
  }

  protected override fillState(): void {
    this.data = {
      _id: undefined,
      user: undefined,
      initialized: false
    };
  }
}
