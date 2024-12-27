import getController from './utils.js';
import * as enums from '../../../enums/index.js';
import AddLoginAttemptDto from '../../../modules/loginAttempt/subModules/add/dto.js';
import GetLoginAttemptDto from '../../../modules/loginAttempt/subModules/get/dto.js';
import State from '../../../tools/state.js';
import type { IAddLoginAttemptDto } from '../../../modules/loginAttempt/subModules/add/types.js';
import type { IGetLoginAttemptDto } from '../../../modules/loginAttempt/subModules/get/types.js';
import type { IUserBrokerInfo } from '../../../types/user.js';

export default class LoginAttemptService {
  async get(payload: unknown, user: IUserBrokerInfo): Promise<void> {
    const action = getController(enums.EControllers.LoginAttempt, enums.ELoginAttemptActions.Get);

    const callback = await action.execute(new GetLoginAttemptDto(payload as IGetLoginAttemptDto));
    return State.broker.send(user.tempId, callback, enums.EMessageTypes.Send);
  }

  async add(payload: unknown, user: IUserBrokerInfo): Promise<void> {
    const action = getController(enums.EControllers.LoginAttempt, enums.ELoginAttemptActions.Add);

    await action.execute(new AddLoginAttemptDto(payload as IAddLoginAttemptDto));
    return State.broker.send(user.tempId, undefined, enums.EMessageTypes.Send);
  }
}
