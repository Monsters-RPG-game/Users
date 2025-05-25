import type { IUserEntity } from '../entity.js';
import type { IRegisterDto } from '../subModules/register/types.js';
import type { FilterQuery } from 'mongoose';
import type mongoose from 'mongoose';

export interface IUserRepository {
  getAll(page: number): Promise<IUserEntity[]>;
  getByLogin(login: string): Promise<IUserEntity | null>;
  getByOidcId(id: string): Promise<IUserEntity | null>;
  remove(id: string): Promise<void>;
  add(data: IRegisterDto): Promise<string>;
  count(filter: FilterQuery<Record<string, unknown>>): Promise<number>;
  addDefault(data: Partial<IUserEntity>): Promise<string>;
  update(id: string, data: Partial<IUserEntity>): Promise<void>;
  get(id: string | mongoose.Types.ObjectId): Promise<IUserEntity | null>;
}
