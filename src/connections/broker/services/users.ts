import getController from './utils.js';
import * as enums from '../../../enums/index.js';
import * as errors from '../../../errors/index.js';
import AddLoginAttemptDto from '../../../modules/loginAttempt/subModules/add/dto.js';
import GetUserDto from '../../../modules/users/subModules/get/dto.js';
import GetAllUsersDto from '../../../modules/users/subModules/getAll/dto.js';
import LoginDto from '../../../modules/users/subModules/login/dto.js';
import RegisterUserDto from '../../../modules/users/subModules/register/dto.js';
import RemoveUserDto from '../../../modules/users/subModules/remove/dto.js';
import State from '../../../tools/state.js';
import type { IGetUserDto } from '../../../modules/users/subModules/get/types';
import type { IGetAllUsersDto } from '../../../modules/users/subModules/getAll/types.js';
import type { ILoginDto } from '../../../modules/users/subModules/login/types';
import type { IRegisterDto } from '../../../modules/users/subModules/register/types.js';
import type { IUserBrokerInfo } from '../../../types/index.js';

export default class UserService {
  async getAll(payload: unknown, user: IUserBrokerInfo): Promise<void> {
    const action = getController(enums.EControllers.Users, enums.EUserActions.GetAll);

    const callback = await action.execute(new GetAllUsersDto(payload as IGetAllUsersDto));
    return State.broker.send(user.tempId, callback, enums.EMessageTypes.Send);
  }

  async getDetails(payload: unknown, user: IUserBrokerInfo): Promise<void> {
    const action = getController(enums.EControllers.Users, enums.EUserActions.Get);

    const callback = await action.execute((payload as IGetUserDto[]).map((p) => new GetUserDto(p)));
    return State.broker.send(user.tempId, callback, enums.EMessageTypes.Send);
  }

  async login(payload: unknown, user: IUserBrokerInfo): Promise<void> {
    const action = getController(enums.EControllers.Users, enums.EUserActions.Login);
    const loginAttemptAction = getController(enums.EControllers.LoginAttempt, enums.ELoginAttemptActions.Add);

    const data = payload as ILoginDto;

    try {
      const callback = await action.execute(new LoginDto(data));
      await loginAttemptAction.execute(
        new AddLoginAttemptDto({ login: data.login, ip: data.ip, output: enums.ELoginOutput.Success }),
      );
      return State.broker.send(user.tempId, callback, enums.EMessageTypes.Credentials);
    } catch (_err) {
      await loginAttemptAction.execute(
        new AddLoginAttemptDto({ login: data.login, ip: data.ip, output: enums.ELoginOutput.Fail }),
      );
      throw new errors.IncorrectCredentialsError();
    }
  }

  async register(payload: unknown): Promise<string> {
    const action = getController(enums.EControllers.Users, enums.EUserActions.Register);

    return action.execute(new RegisterUserDto(payload as IRegisterDto));
  }

  async remove(password: string, id: string): Promise<void> {
    const loginAction = getController(enums.EControllers.Users, enums.EUserActions.Login);
    const removeAccountAction = getController(enums.EControllers.Users, enums.EUserActions.Remove);

    await loginAction.comparePassword(id, password);
    await removeAccountAction.execute(new RemoveUserDto({ password }, id));
  }
}
