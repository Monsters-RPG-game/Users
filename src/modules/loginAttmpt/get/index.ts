import GetLoginAttemptDto from './dto';
import ControllerFactory from '../../../tools/abstract/controller';
import Rooster from '../rooster';
import type { IGetLoginAttemptDto } from './types';
import type { EModules } from '../../../tools/abstract/enums';
import type { ILoginAttemptEntity } from '../entity';

export default class Controller extends ControllerFactory<EModules.LoginAttempt> {
  constructor() {
    super(new Rooster());
  }

  async get(data: IGetLoginAttemptDto): Promise<ILoginAttemptEntity[]> {
    const payload = new GetLoginAttemptDto(data);
    return this.rooster.getByLogin(payload.login);
  }
}
