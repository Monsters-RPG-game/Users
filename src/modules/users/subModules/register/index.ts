import * as errors from '../../../../errors/index.js';
import * as utils from '../../utils.js';
import type RegisterUserDto from './dto.js';
import type { IAbstractSubController } from '../../../../types/index.js';
import type UserRepository from '../../repository/index.js';

export default class RegisterUserController implements IAbstractSubController<string> {
  constructor(repo: UserRepository) {
    this.repo = repo;
  }

  private accessor repo: UserRepository;

  async execute(data: RegisterUserDto): Promise<string> {
    const { email, password, login } = data;
    const byEmail = await this.repo.getByEmail(email);
    const byLogin = await this.repo.getByLogin(login);

    if (byEmail ?? byLogin) {
      if (byLogin?.login === login) throw new errors.UsernameAlreadyInUseError();
      if (byEmail?.email === email) throw new errors.UserAlreadyRegisteredError();
    }

    const hashed = utils.hashPassword(password);
    return this.repo.add({ ...data, password: hashed });
  }
}
