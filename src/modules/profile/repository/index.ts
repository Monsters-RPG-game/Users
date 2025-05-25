import Log from 'simpl-loggar';
import Profile from '../model.js';
import MongoProfileRepository from './logic/mongo.js';
import { NoRepositoryControllerSpecified } from '../../../errors/index.js';
import getConfig from '../../../tools/configLoader.js';
import type { IProfileRepository } from './types.js';
import type { IProfileEntity } from '../entity.js';
import type { IAddBasicProfileDto } from '../subModules/addBasic/types.js';
import type mongoose from 'mongoose';
import type { FilterQuery } from 'mongoose';

class ProfileRepository implements IProfileRepository {
  constructor(repository: IProfileRepository) {
    this.repository = repository;
  }

  private accessor repository: IProfileRepository;

  async add(data: undefined): Promise<string> {
    return this.repository.add(data);
  }

  async getByUser(id: string): Promise<IProfileEntity | null> {
    return this.repository.getByUser(id);
  }

  async addDefault(data: IAddBasicProfileDto): Promise<string> {
    return this.repository.addDefault(data);
  }

  async remove(id: string): Promise<void> {
    return this.repository.remove(id);
  }

  async get(id: string | mongoose.Types.ObjectId): Promise<IProfileEntity | null> {
    return this.repository.get(id);
  }

  async update(id: string, data: Partial<IProfileEntity>): Promise<void> {
    return this.repository.update(id, data);
  }

  async count(filter: FilterQuery<Record<string, unknown>>): Promise<number> {
    return this.repository.count(filter);
  }
}

export default class ProfileFacade {
  static createInstance(): IProfileRepository {
    const repositoryTarget = getConfig().repository;

    switch (repositoryTarget) {
      case 'mongo':
        ProfileFacade.instance = new ProfileRepository(new MongoProfileRepository(Profile));
        return ProfileFacade.instance;
      default:
        Log.error('No repository controller specified. Please specify type of controller in config files');
        throw new NoRepositoryControllerSpecified();
    }
  }

  private static accessor instance: IProfileRepository | undefined = undefined;
}
