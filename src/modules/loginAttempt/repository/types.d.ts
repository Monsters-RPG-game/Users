import type { ILoginAttemptEntity } from '../entity.js';

export interface ILoginAttemptRepository {
  getByLogin(login: string): Promise<ILoginAttemptEntity[]>;
}
