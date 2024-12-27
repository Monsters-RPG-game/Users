import getController from './utils.js';
import * as enums from '../../../enums/index.js';
import AddBasicProfileDto from '../../../modules/profile/subModules/addBasic/dto.js';
import GetProfileDto from '../../../modules/profile/subModules/get/dto.js';
import RemoveProfileDto from '../../../modules/profile/subModules/remove/dto.js';
import State from '../../../tools/state.js';
import type { IAddBasicProfileDto } from '../../../modules/profile/subModules/addBasic/types.js';
import type { IGetProfileDto } from '../../../modules/profile/subModules/get/types.js';
import type { IRemoveProfileDto } from '../../../modules/profile/subModules/remove/types.js';
import type { IUserBrokerInfo } from '../../../types/user.js';

export default class ProfileService {
  async get(payload: unknown, user: IUserBrokerInfo): Promise<void> {
    const action = getController(enums.EControllers.Profile, enums.EProfileActions.Get);

    const callBack = await action.execute(new GetProfileDto(payload as IGetProfileDto));
    return State.broker.send(user.tempId, callBack, enums.EMessageTypes.Send);
  }

  async addBasic(user: string, party: string, inventory: string, stats: string, skills: string): Promise<string> {
    const action = getController(enums.EControllers.Profile, enums.EProfileActions.AddBasic);

    return action.execute(new AddBasicProfileDto({ user, party, inventory, stats, skills } as IAddBasicProfileDto));
  }

  async remove(id: string): Promise<void> {
    const action = getController(enums.EControllers.Profile, enums.EProfileActions.Remove);

    return action.execute(new RemoveProfileDto({ id } as IRemoveProfileDto));
  }
}
