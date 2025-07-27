import Log from 'simpl-loggar';
import MongoUserRepository from './logic/mongo.js';
import { NoRepositoryControllerSpecified } from '../../../errors/index.js';
import ConfigLoader from '../../../tools/config/index.js';
import User from '../model.js';
import type { IUserRepository } from './types.js';
import type { IUserEntity } from '../entity.js';
import type { IRegisterDto } from '../subModules/register/types.js';
import type mongoose from 'mongoose';
import type { FilterQuery } from 'mongoose';

class UserRepository implements IUserRepository {
  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  private accessor repository: IUserRepository;

  async addDefault(data: Partial<IUserEntity>): Promise<string> {
    return this.repository.addDefault(data);
  }

  async remove(id: string): Promise<void> {
    return this.repository.remove(id);
  }

  async getByOidcId(id: string): Promise<IUserEntity | null> {
    return this.repository.getByOidcId(id);
  }

  async getByLogin(login: string): Promise<IUserEntity | null> {
    return this.repository.getByLogin(login);
  }

  async getAll(page: number = 1): Promise<IUserEntity[]> {
    return this.repository.getAll(page);
  }

  async get(id: string | mongoose.Types.ObjectId): Promise<IUserEntity | null> {
    return this.repository.get(id);
  }

  async update(id: string, data: Partial<IUserEntity>): Promise<void> {
    return this.repository.update(id, data);
  }

  async add(data: IRegisterDto): Promise<string> {
    return this.repository.add(data);
  }

  async count(filter: FilterQuery<Record<string, unknown>>): Promise<number> {
    return this.repository.count(filter);
  }
}

export default class UserFacade {
  static createInstance(): IUserRepository {
    const repositoryTarget = ConfigLoader.getConfig().repository;

    switch (repositoryTarget) {
      case 'mongo':
        UserFacade.instance = new UserRepository(new MongoUserRepository(User));
        return UserFacade.instance;
      default:
        Log.error('No repository controller specified. Please specify type of controller in config files');
        throw new NoRepositoryControllerSpecified();
    }
  }

  private static accessor instance: IUserRepository | undefined = undefined;
}
