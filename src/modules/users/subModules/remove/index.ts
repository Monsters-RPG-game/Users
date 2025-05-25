import type RemoveUserDto from './dto.js';
import type { IAbstractSubController } from '../../../../types/index.js';
import type { IUserRepository } from '../../repository/types.js';

export default class RemoveUserController implements IAbstractSubController<void> {
  constructor(repo: IUserRepository) {
    this.repo = repo;
  }

  private accessor repo: IUserRepository;

  async execute(data: RemoveUserDto): Promise<void> {
    await this.repo.remove(data.userId);
  }
}
