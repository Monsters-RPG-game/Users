import * as errors from '../../../../errors/index.js';
import * as utils from '../../utils.js';
import type LoginDto from './dto.js';
import type { IAbstractSubController } from '../../../../types/index.js';
import type UserRepository from '../../repository/index.js';

export default class LoginUserController implements IAbstractSubController<string> {
  constructor(repo: UserRepository) {
    this.repo = repo;
  }

  private accessor repo: UserRepository;

  async execute(data: LoginDto): Promise<string> {
    const { login, password } = data;
    const user = await this.repo.getByLogin(login);
    if (!user) throw new errors.IncorrectCredentialsError();

    await utils.compare(password, user.password);

    return user._id.toString();
  }

  async comparePassword(userId: string, password: string): Promise<void> {
    const user = await this.repo.get(userId);
    if (!user) throw new errors.NoUser();

    return utils.compare(password, user.password);
  }
}
