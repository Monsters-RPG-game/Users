import type { IUserEntity } from '../entity.js';

export interface IUserRepository {
  getAll(page: number): Promise<IUserEntity[]>;
  getByLogin(login: string): Promise<IUserEntity | null>;
  getByOidcId(id: string): Promise<IUserEntity | null>;
  remove(id: string): Promise<void>;
}
