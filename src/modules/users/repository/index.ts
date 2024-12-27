import AbstractRepository from '../../../tools/abstractions/repository.js';
import type { IUserRepository } from './types.js';
import type * as enums from '../../../enums/index.js';
import type { IUserEntity } from '../entity.js';
import type User from '../model.js';
import type { IUser } from '../types.js';

export default class UserRepository
  extends AbstractRepository<IUser, typeof User, enums.EControllers.Users>
  implements IUserRepository
{
  async getAll(page: number): Promise<IUserEntity[]> {
    return this.model
      .find()
      .sort({ createdAt: 1 })
      .limit(100)
      .skip((page <= 0 ? 0 : page - 1) * 100)
      .lean();
  }

  async getByEmail(data: string): Promise<IUserEntity | null> {
    return this.model.findOne({ email: data }).lean();
  }

  async getByLogin(data: string): Promise<IUserEntity | null> {
    return this.model.findOne({ login: data }).lean();
  }

  async remove(id: string): Promise<void> {
    await this.model.findOneAndDelete({ _id: id });
  }
}
