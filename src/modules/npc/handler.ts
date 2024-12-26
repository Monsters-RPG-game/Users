import AddController from './add';
import AddBasicController from './addBasic';
import GetController from './get';
import RemoveController from './remove';
import UpdateController from './update';
import * as enums from '../../enums';
import HandlerFactory from '../../tools/abstract/handler';
import State from '../../tools/state';
import GetStatsController from '../stats/get';
import type { IAddCharacterDto } from './add/types';
import type { IAddBasicCharacterDto } from './addBasic/types';
import type { IGetCharacterDto } from './get/types';
import type { IRemoveCharacterDto } from './remove/types';
import type { IUpdateCharacterDto } from './update/types';
import type { EModules } from '../../tools/abstract/enums';
import type * as types from '../../types';

export default class CharacterHandler extends HandlerFactory<EModules.Npc> {
  private readonly _addController: AddController;
  private readonly _addBasicController: AddBasicController;
  private readonly _getStatsController: GetStatsController;
  private readonly _updateController: UpdateController;
  private readonly _removeController: RemoveController;

  constructor() {
    super(new GetController());
    this._addController = new AddController();
    this._addBasicController = new AddBasicController();
    this._getStatsController = new GetStatsController();
    this._updateController = new UpdateController();
    this._removeController = new RemoveController();
  }

  private get getStatsController(): GetStatsController {
    return this._getStatsController;
  }

  private get removeController(): RemoveController {
    return this._removeController;
  }

  private get updateController(): UpdateController {
    return this._updateController;
  }

  private get addController(): AddController {
    return this._addController;
  }

  private get addBasicController(): AddBasicController {
    return this._addBasicController;
  }

  async get(payload: unknown, user: types.ILocalUser): Promise<void> {
    const npcs = await this.getController.get(payload as IGetCharacterDto);
    const stats = await this.getStatsController.getMany(
      npcs.map((c) => {
        return { id: c.stats.toString() };
      }),
    );
    const callback = npcs.map((npc) => {
      return { ...npc, stats: stats.find((s) => s._id.toString() === npc.stats.toString()) };
    });
    return State.broker.send(user.tempId, callback, enums.EMessageTypes.Send);
  }

  async addBasic(payload: IAddBasicCharacterDto): Promise<string> {
    return this.addBasicController.addBasic(payload);
  }

  async add(payload: IAddCharacterDto, characterId: string): Promise<void> {
    return this.addController.add(payload, characterId);
  }

  async update(payload: unknown, user: types.ILocalUser): Promise<void> {
    await this.updateController.update(payload as IUpdateCharacterDto);
    return State.broker.send(user.tempId, undefined, enums.EMessageTypes.Send);
  }

  async remove(payload: unknown, user: types.ILocalUser): Promise<void> {
    await this.removeController.remove(payload as IRemoveCharacterDto);
    return State.broker.send(user.tempId, undefined, enums.EMessageTypes.Send);
  }
}
