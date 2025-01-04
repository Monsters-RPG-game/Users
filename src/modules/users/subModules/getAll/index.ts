import type GetAllDto from './dto.js';
import type { IAbstractSubController } from '../../../../types/index.js';
import type { IUserDetails, IUserEntity } from '../../entity.js';
import type UserRepository from '../../repository/index.js';

export default class GetAllUsersController implements IAbstractSubController<IUserDetails[]> {
  constructor(repo: UserRepository) {
    this.repo = repo;
  }

  private accessor repo: UserRepository;

  async execute(data: GetAllDto): Promise<IUserDetails[]> {
    const users = await this.repo.getAll(data.page);

    return users
      .filter((u): u is IUserEntity => u !== null)
      .map((u) => {
        return {
          _id: u._id.toString(),
          login: u.login,
        };
      });
  }
}
