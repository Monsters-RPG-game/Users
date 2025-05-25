import type { IProfileEntity } from '../entity.js';
import type { IAddBasicProfileDto } from '../subModules/addBasic/types.js';
import type { FilterQuery } from 'mongoose';
import type mongoose from 'mongoose';

export interface IProfileRepository {
  getByUser(id: string): Promise<IProfileEntity | null>;
  remove(id: string): Promise<void>;
  addDefault(data: IAddBasicProfileDto): Promise<string>;
  add(data: undefined): Promise<string>;
  count(filter: FilterQuery<Record<string, unknown>>): Promise<number>;
  update(id: string, data: Partial<IProfileEntity>): Promise<void>;
  get(id: string | mongoose.Types.ObjectId): Promise<IProfileEntity | null>;
}
