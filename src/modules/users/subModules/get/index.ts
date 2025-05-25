import GetUserEntity from './entity.js';
import type GetUserDto from './dto.js';
import type { IAbstractSubController } from '../../../../types/index.js';
import type { IUserDetails, IUserEntity } from '../../entity.js';
import type { IUserRepository } from '../../repository/types.js';

export default class GetUserController implements IAbstractSubController<IUserDetails[]> {
  constructor(repo: IUserRepository) {
    this.repo = repo;
  }

  private accessor repo: IUserRepository;

  async execute(data: GetUserDto[]): Promise<IUserDetails[]> {
    const users = await Promise.all(
      data.map(async (u) => {
        if (u.id) return this.repo.get(u.id);
        if (u.name) return this.repo.getByLogin(u.name);
        return this.repo.getByOidcId(u.oidcId as string);
      }),
    );

    return users.filter((u): u is IUserEntity => u !== null).map((u) => new GetUserEntity(u as IUserDetails));
  }
}
