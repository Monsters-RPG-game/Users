import TemplateFactory from './abstracts.js';
import User from '../../../../src/modules/users/model.js';
import { hashPassword } from '../../../../src/modules/users/utils.js';
import type * as enums from '../../../../src/enums/index.js';
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

  email(email?: string): this {
    this.data.email = email;
    return this;
  }

  password(password?: string): this {
    if (password) this.data.password = hashPassword(password);
    return this;
  }

  type(type?: enums.EUserTypes): this {
    this.data.type = type;
    return this;
  }

  verified(verified?: boolean): this {
    this.data.verified = verified;
    return this;
  }

  protected override fillState(): void {
    this.data = {
      _id: undefined,
      email: undefined,
      login: undefined,
      password: undefined,
      type: undefined,
      verified: false,
    };
  }
}
