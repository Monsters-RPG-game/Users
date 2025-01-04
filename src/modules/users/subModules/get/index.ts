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
        if (u.id) return this.repo.get(u.id);
        if (u.name) return this.repo.getByLogin(u.name);
        return this.repo.getByOidcId(u.oidcId as string);
      }),
    );

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
