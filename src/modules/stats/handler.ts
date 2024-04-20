import AddController from './add';
import AddBasicController from './addBasic';
import GetController from './get';
import * as enums from '../../enums';
import HandlerFactory from '../../tools/abstract/handler';
import State from '../../tools/state';
import type { IAddStatsDto } from './add/types';
import type { IAddBasicStatsDto } from './addBasic/types';
import type { IGetStatsDto } from './get/types';
import type { EModules } from '../../tools/abstract/enums';
import type * as types from '../../types';

export default class StatsHandler extends HandlerFactory<EModules.Stats> {
  private readonly _addBasicController: AddBasicController;
  private readonly _addController: AddController;

  constructor() {
    super(new GetController());
    this._addBasicController = new AddBasicController();
    this._addController = new AddController();
  }

  private get addBasicController(): AddBasicController {
    return this._addBasicController;
  }

  private get addController(): AddController {
    return this._addController;
  }

  async get(payload: unknown, user: types.ILocalUser): Promise<void> {
    const callBack = await this.getController.get(payload as IGetStatsDto);
    return State.broker.send(user.tempId, callBack, enums.EMessageTypes.Send);
  }

  async add(payload: IAddStatsDto, user: types.ILocalUser): Promise<void> {
    return this.addController.add(payload, user);
  }

  async addBasic(owner: string): Promise<string> {
    return this.addBasicController.add({ owner } as IAddBasicStatsDto);
  }
}
