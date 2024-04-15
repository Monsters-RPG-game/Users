import LoginAttemptDto from './dto';
import ControllerFactory from '../../../tools/abstract/controller';
import Rooster from '../rooster';
import type { IAddLoginAttemptDto } from './types';
import type { EModules } from '../../../tools/abstract/enums';

export default class Controller extends ControllerFactory<EModules.LoginAttempt> {
  constructor() {
    super(new Rooster());
  }

  async add(data: IAddLoginAttemptDto): Promise<void> {
    const payload = new LoginAttemptDto(data);
    await this.rooster.add(payload);
  }
}
