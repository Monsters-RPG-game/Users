import AbstractRepository from '../../../tools/abstractions/repository.js';
import type { IProfileRepository } from './types.js';
import type * as enums from '../../../enums/index.js';
import type { IProfileEntity } from '../entity.js';
import type Profile from '../model.js';
import type { IProfile } from '../types.js';

export default class ProfileRepository
  extends AbstractRepository<IProfile, typeof Profile, enums.EControllers.Profile>
  implements IProfileRepository
{
  async getByUser(id: string): Promise<IProfileEntity | null> {
    return this.model.findOne({ user: id }).lean();
  }

  async remove(id: string): Promise<void> {
    await this.model.findOneAndDelete({ _id: id });
  }
}
