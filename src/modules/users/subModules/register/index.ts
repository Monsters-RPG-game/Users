import * as errors from '../../../../errors/index.js';
import type RegisterUserDto from './dto.js';
import type { IAbstractSubController } from '../../../../types/index.js';
import type UserRepository from '../../repository/index.js';

export default class RegisterUserController implements IAbstractSubController<string> {
  constructor(repo: UserRepository) {
    this.repo = repo;
  }

  private accessor repo: UserRepository;

  async execute(data: RegisterUserDto): Promise<string> {
    const { login } = data;
    const byLogin = await this.repo.getByLogin(login);

    if (byLogin) throw new errors.UsernameAlreadyInUseError();

    return this.repo.add(data);
  }
}
