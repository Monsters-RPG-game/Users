import type { IProfileEntity } from '../entity.js';

export interface IProfileRepository {
  getByUser(id: string): Promise<IProfileEntity | null>;
  remove(id: string): Promise<void>;
}
