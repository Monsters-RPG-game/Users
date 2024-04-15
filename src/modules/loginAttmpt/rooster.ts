import LoginAttempt from './model';
import RoosterFactory from '../../tools/abstract/rooster';
import type { ILoginAttemptEntity } from './entity';
import type { ILoginAttempt } from './types';
import type { EModules } from '../../tools/abstract/enums';

export default class Rooster extends RoosterFactory<ILoginAttempt, typeof LoginAttempt, EModules.LoginAttempt> {
  constructor() {
    super(LoginAttempt);
  }

  async getByLogin(login: string): Promise<ILoginAttemptEntity[]> {
    return this.model.find({ login }).lean();
  }
}
