import AbstractRepository from '../../../tools/abstractions/repository.js';
import type LoginAttemptModel from '../model.js';
import type { ILoginAttemptRepository } from './types.js';
import type * as enums from '../../../enums/index.js';
import type { ILoginAttemptEntity } from '../entity.js';
import type { ILoginAttempt } from '../types.js';

export default class LoginAttemptRepository
  extends AbstractRepository<ILoginAttempt, typeof LoginAttemptModel, enums.EControllers.LoginAttempt>
  implements ILoginAttemptRepository
{
  async getByLogin(login: string): Promise<ILoginAttemptEntity[]> {
    return this.model.find({ login }).lean();
  }
}
