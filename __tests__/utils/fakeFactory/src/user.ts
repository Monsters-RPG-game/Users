import TemplateFactory from './abstracts.js';
import User from '../../../../src/modules/users/model.js';
import type { IUserEntity } from '../../../../src/modules/users/entity.js';
import type { EFakeData } from '../enums/index.js';
import type { IAbstractBody } from '../types/data.js';
import mongoose from 'mongoose';

export default class FakeUser extends TemplateFactory<EFakeData.User> implements IAbstractBody<IUserEntity> {
  constructor() {
    super(User);
  }

  _id(id?: string | mongoose.Types.ObjectId): this {
    this.data._id = id;
    return this;
  }

  login(login?: string): this {
    this.data.login = login;
    return this;
  }

  oidcId(oidcId?: string): this {
    this.data.oidcId = oidcId;
    return this;
  }

  protected override fillState(): void {
    this.data = {
      _id: undefined,
      oidcId: undefined,
    };
  }
}
