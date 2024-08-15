import AddController from './add';
import AddBasicController from './addBasic';
import GetController from './get';
import GetDetailedController from './getDetailed';
import * as enums from '../../enums';
import HandlerFactory from '../../tools/abstract/handler';
import State from '../../tools/state';
import type { IAddSkillsDto } from './add/types';
import type { IAddBasicSkillsDto } from './addBasic/types';
import type { IGetSkillsDto } from './get/types';
import type { IGetDetailedSkillsDto } from './getDetailed/types';
import type { EModules } from '../../tools/abstract/enums';
import type * as types from '../../types';

export default class SkillsController extends HandlerFactory<EModules.Skills> {
  private readonly _addController: AddController;
  private readonly _addBasicController: AddBasicController;
  private readonly _getDetailedController: GetDetailedController;

  constructor() {
    super(new GetController());
    this._addController = new AddController();
    this._addBasicController = new AddBasicController();
    this._getDetailedController = new GetDetailedController();
  }

  private get addBasicController(): AddBasicController {
    return this._addBasicController;
  }

  private get addController(): AddController {
    return this._addController;
  }

  async getDetailed(payload: unknown, user: types.ILocalUser): Promise<void> {
    const callBack = await this.getDetailedController.get(payload as IGetDetailedSkillsDto);
    return State.broker.send(user.tempId, callBack, enums.EMessageTypes.Send);
  }
  private get getDetailedController(): GetDetailedController {
    return this._getDetailedController;
  }

  async get(payload: unknown, user: types.ILocalUser): Promise<void> {
    const callBack = await this.getController.get(payload as IGetSkillsDto);
    return State.broker.send(user.tempId, callBack, enums.EMessageTypes.Send);
  }

  async add(payload: unknown, user: types.ILocalUser): Promise<void> {
    // return this.addController.add(payload as IAddSkillsDto, user);
    const callBack = await this.addController.add(payload as IAddSkillsDto);
    return State.broker.send(user.tempId, callBack, enums.EMessageTypes.Send);
  }

  async addBasic(owner: string): Promise<string> {
    return this.addBasicController.addBasic({ owner } as IAddBasicSkillsDto);
  }
}
