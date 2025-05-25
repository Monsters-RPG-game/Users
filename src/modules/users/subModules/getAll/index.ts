import GetAllUsersEntity from './entity.js';
import type GetAllDto from './dto.js';
import type { IAbstractSubController } from '../../../../types/index.js';
import type { IUserDetails, IUserEntity } from '../../entity.js';
import type { IUserRepository } from '../../repository/types.js';

export default class GetAllUsersController implements IAbstractSubController<IUserDetails[]> {
  constructor(repo: IUserRepository) {
    this.repo = repo;
  }

  private accessor repo: IUserRepository;

  async execute(data: GetAllDto): Promise<IUserDetails[]> {
    const users = await this.repo.getAll(data.page);

    return users.filter((u): u is IUserEntity => u !== null).map((u) => new GetAllUsersEntity(u as IUserDetails));
  }
}
