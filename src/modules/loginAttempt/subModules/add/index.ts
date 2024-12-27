import type AddLoginAttemptDto from './dto.js';
import type { IAbstractSubController } from '../../../../types/index.js';
import type LoginAttemptRepository from '../../repository/index.js';

export default class AddLoginAttemptController implements IAbstractSubController<void> {
  constructor(repo: LoginAttemptRepository) {
    this.repo = repo;
  }

  private accessor repo: LoginAttemptRepository;

  async execute(data: AddLoginAttemptDto): Promise<void> {
    await this.repo.add(data);
  }
}
