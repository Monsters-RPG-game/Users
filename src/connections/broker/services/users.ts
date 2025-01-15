import getController from './utils.js';
import * as enums from '../../../enums/index.js';
import GetUserDto from '../../../modules/users/subModules/get/dto.js';
import GetAllUsersDto from '../../../modules/users/subModules/getAll/dto.js';
import RegisterUserDto from '../../../modules/users/subModules/register/dto.js';
import RemoveUserDto from '../../../modules/users/subModules/remove/dto.js';
import State from '../../../tools/state.js';
import type { IGetUserDto } from '../../../modules/users/subModules/get/types.js';
import type { IGetAllUsersDto } from '../../../modules/users/subModules/getAll/types.js';
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

  async register(payload: unknown): Promise<string> {
    const action = getController(enums.EControllers.Users, enums.EUserActions.Register);

    return action.execute(new RegisterUserDto(payload as IRegisterDto));
  }

  async remove(id: string): Promise<void> {
    const removeAccountAction = getController(enums.EControllers.Users, enums.EUserActions.Remove);

    await removeAccountAction.execute(new RemoveUserDto({ userId: id }));
  }
}
