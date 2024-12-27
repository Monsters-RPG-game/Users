import type RemoveUserDto from './dto.js';
import type { IAbstractSubController } from '../../../../types/index.js';
import type UserRepository from '../../repository/index.js';

export default class RemoveUserController implements IAbstractSubController<void> {
  constructor(repo: UserRepository) {
    this.repo = repo;
  }

  private accessor repo: UserRepository;

  async execute(data: RemoveUserDto): Promise<void> {
    await this.repo.remove(data.id);
  }
}
