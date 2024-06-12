import GetController from './get';
import * as enums from '../../enums';
import HandlerFactory from '../../tools/abstract/handler';
import State from '../../tools/state';
import type { IGetSkillsDto } from './get/types';
import type { EModules } from '../../tools/abstract/enums';
import type * as types from '../../types';

export default class Handler extends HandlerFactory<EModules.Skills> {
  constructor() {
    super(new GetController());
  }

  async get(payload: unknown, user: types.ILocalUser): Promise<void> {
    const callBack = await this.getController.get(payload as IGetSkillsDto);
    return State.broker.send(user.tempId, callBack, enums.EMessageTypes.Send);
  }
}
