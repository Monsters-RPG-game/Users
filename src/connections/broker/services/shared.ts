import getController from './utils.js';
import * as enums from '../../../enums/index.js';
import AddBasicProfileDto from '../../../modules/profile/subModules/addBasic/dto.js';
import RemoveProfileDto from '../../../modules/profile/subModules/remove/dto.js';
import RegisterUserDto from '../../../modules/users/subModules/register/dto.js';
import RemoveUserDto from '../../../modules/users/subModules/remove/dto.js';
import State from '../../../tools/state.js';
import type { IRegisterDto } from '../../../modules/users/subModules/register/types.js';
import type { IRemoveUserDto } from '../../../modules/users/subModules/remove/types.js';
import type { IUserBrokerInfo } from '../../../types/user.js';

export default class SharedService {
  async removeUser(payload: unknown, user: IUserBrokerInfo): Promise<void> {
    const removeUserAction = getController(enums.EControllers.Users, enums.EUserActions.Remove);
    const removeProfileAction = getController(enums.EControllers.Profile, enums.EProfileActions.Remove);

    const { password, id } = new RemoveUserDto(payload as IRemoveUserDto, user.userId as string);

    await removeUserAction.execute(new RemoveUserDto({ password }, id));
    await removeProfileAction.execute(new RemoveProfileDto({ id }));

    return State.broker.send(user.tempId, undefined, enums.EMessageTypes.Send);
  }

  async register(payload: unknown, user: IUserBrokerInfo): Promise<void> {
    const registerAction = getController(enums.EControllers.Users, enums.EUserActions.Register);
    const addBasicProfileAction = getController(enums.EControllers.Profile, enums.EProfileActions.AddBasic);

    const id = (await registerAction.execute(new RegisterUserDto(payload as IRegisterDto))).toString();

    await addBasicProfileAction.execute(new AddBasicProfileDto({ user: id.toString() }));

    return State.broker.send(user.tempId, undefined, enums.EMessageTypes.Send);
  }
}
