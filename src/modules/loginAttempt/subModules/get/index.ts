import type GetLoginAttemptDto from './dto.js';
import type { IAbstractSubController } from '../../../../types/index.js';
import type { ILoginAttemptEntity } from '../../entity.js';
import type LoginAttemptRepository from '../../repository/index.js';

export default class GetLoginAttemptController implements IAbstractSubController<ILoginAttemptEntity[]> {
  constructor(repo: LoginAttemptRepository) {
    this.repo = repo;
  }

  private accessor repo: LoginAttemptRepository;

  async execute(data: GetLoginAttemptDto): Promise<ILoginAttemptEntity[]> {
    return this.repo.getByLogin(data.login);
  }
}
