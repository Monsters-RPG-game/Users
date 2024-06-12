import AddController from './add';
import GetController from './get';
import * as enums from '../../enums';
import HandlerFactory from '../../tools/abstract/handler';
import State from '../../tools/state';
import type { IAddSingleSkillDto } from './add/types';
import type { IGetSingleSkillDto } from './get/types';
import type { EModules } from '../../tools/abstract/enums';
import type * as types from '../../types';

export default class Handler extends HandlerFactory<EModules.SingleSkill> {
  private readonly _addController: AddController;
  constructor() {
    super(new GetController());
    this._addController = new AddController();
  }

  async get(payload: unknown, user: types.ILocalUser): Promise<void> {
    const callBack = await this.getController.get(payload as IGetSingleSkillDto);
    return State.broker.send(user.tempId, callBack, enums.EMessageTypes.Send);
  }

  async add(payload: unknown, user: types.ILocalUser): Promise<void> {
    const callBack = await this._addController.add(payload as IAddSingleSkillDto);
    return State.broker.send(user.tempId, callBack, enums.EMessageTypes.Send);
  }
}
