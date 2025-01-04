import * as services from './services/index.js';
import * as enums from '../../enums/index.js';
import * as errors from '../../errors/index.js';
import type * as types from '../../types/index.js';

export default class Handler {
  private readonly _profileServices: services.ProfileServices;
  private readonly _userServices: services.UserServices;
  private readonly _sharedServices: services.SharedServices;

  constructor() {
    this._profileServices = new services.ProfileServices();
    this._userServices = new services.UserServices();
    this._sharedServices = new services.SharedServices();
  }

  private get profileServices(): services.ProfileServices {
    return this._profileServices;
  }

  private get userServices(): services.UserServices {
    return this._userServices;
  }

  private get sharedServices(): services.SharedServices {
    return this._sharedServices;
  }

  async profileMessage(message: types.IRabbitMessage): Promise<void> {
    switch (message.subTarget) {
      case enums.EProfileTargets.Get:
        return this.profileServices.get(message.payload, message.user);
      default:
        throw new errors.IncorrectTargetError();
    }
  }

  async userMessage(message: types.IRabbitMessage): Promise<void> {
    switch (message.subTarget) {
      case enums.EUserTargets.Register:
        return this.sharedServices.register(message.payload, message.user);
      case enums.EUserTargets.GetName:
        return this.userServices.getDetails(message.payload, message.user);
      case enums.EUserTargets.DebugGetAll:
        return this.userServices.getAll(message.payload, message.user);
      case enums.ESharedTargets.RemoveUser:
        return this.sharedServices.removeUser(message.user);
      default:
        throw new errors.IncorrectTargetError();
    }
  }
}
