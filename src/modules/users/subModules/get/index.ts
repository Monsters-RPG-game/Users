import type GetUserDto from './dto.js';
import type { IAbstractSubController } from '../../../../types/index.js';
import type { IUserDetails, IUserEntity } from '../../entity.js';
import type UserRepository from '../../repository/index.js';

export default class GetUserController implements IAbstractSubController<IUserDetails[]> {
  constructor(repo: UserRepository) {
    this.repo = repo;
  }

  private accessor repo: UserRepository;

  async execute(data: GetUserDto[]): Promise<IUserDetails[]> {
    const users = await Promise.all(
      data.map(async (u) => {
        return u.id ? this.repo.get(u.id) : this.repo.getByLogin(u.name as string);
      }),
    );

    return users
      .filter((u): u is IUserEntity => u !== null)
      .map((u) => {
        return {
          _id: u._id.toString(),
          login: u.login,
          verified: u.verified,
          type: u.type,
        };
      });
  }
}
