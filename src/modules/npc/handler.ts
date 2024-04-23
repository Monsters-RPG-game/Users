import AddController from './add';
import AddBasicController from './addBasic';
import GetController from './get';
import * as enums from '../../enums';
import HandlerFactory from '../../tools/abstract/handler';
import State from '../../tools/state';
import type { IAddCharacterDto } from './add/types';
import type { IAddBasicCharacterDto } from './addBasic/types';
import type { IGetCharacterDto } from './get/types';
import type { EModules } from '../../tools/abstract/enums';
import type * as types from '../../types';

export default class CharacterHandler extends HandlerFactory<EModules.Npc> {
  private readonly _addController: AddController;
  private readonly _addBasicController: AddBasicController;

  constructor() {
    super(new GetController());
    this._addController = new AddController();
    this._addBasicController = new AddBasicController();
  }

  private get addController(): AddController {
    return this._addController;
  }

  private get addBasicController(): AddBasicController {
    return this._addBasicController;
  }

  async get(payload: unknown, user: types.ILocalUser): Promise<void> {
    const callBack = await this.getController.get(payload as IGetCharacterDto);
    return State.broker.send(user.tempId, callBack, enums.EMessageTypes.Send);
  }

  async addBasic(payload: IAddBasicCharacterDto): Promise<string> {
    return this.addBasicController.addBasic(payload);
  }

  async add(payload: IAddCharacterDto, characterId: string): Promise<void> {
    return this.addController.add(payload, characterId);
  }
}
