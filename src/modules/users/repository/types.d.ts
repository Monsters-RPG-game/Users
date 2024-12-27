import type { IUserEntity } from '../entity.js';

export interface IUserRepository {
  getAll(page: number): Promise<IUserEntity[]>;
  getByEmail(email: string): Promise<IUserEntity | null>;
  getByLogin(login: string): Promise<IUserEntity | null>;
  remove(id: string): Promise<void>;
}
