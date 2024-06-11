import AddController from './add';
import AddBasicController from './addBasic';
import AddExpController from './addExp';
import CharacterStateController from './changeState';
import GetController from './get';
import RemoveController from './remove';
import * as enums from '../../enums';
import HandlerFactory from '../../tools/abstract/handler';
import State from '../../tools/state';
import type { IAddProfileDto } from './add/types';
import type { IAddBasicProfileDto } from './addBasic/types';
import type { IAddExpDto } from './addExp/types';
import type ChangeCharacterStatusDto from './changeState/dto';
import type { IGetProfileDto } from './get/types';
import type { IRemoveProfileDto } from './remove/types';
import type { EModules } from '../../tools/abstract/enums';
import type * as types from '../../types';

export default class ProfileHandler extends HandlerFactory<EModules.Profiles> {
  private readonly _removeController: RemoveController;
  private readonly _addBasicController: AddBasicController;
  private readonly _addController: AddController;
  private readonly _addExpController: AddExpController;
  private readonly _characterStateController: CharacterStateController;

  constructor() {
    super(new GetController());
    this._removeController = new RemoveController();
    this._addBasicController = new AddBasicController();
    this._addController = new AddController();
    this._addExpController = new AddExpController();
    this._characterStateController = new CharacterStateController();
  }

  private get removeController(): RemoveController {
    return this._removeController;
  }

  private get addBasicController(): AddBasicController {
    return this._addBasicController;
  }

  private get characterStateController(): CharacterStateController {
    return this._characterStateController;
  }

  private get addController(): AddController {
    return this._addController;
  }

  private get addExpController(): AddExpController {
    return this._addExpController;
  }

  async get(payload: unknown, user: types.ILocalUser): Promise<void> {
    const callBack = await this.getController.get(payload as IGetProfileDto);
    return State.broker.send(user.tempId, callBack, enums.EMessageTypes.Send);
  }

  async add(payload: IAddProfileDto, user: types.ILocalUser): Promise<void> {
    return this.addController.add(payload, user);
  }

  async addExp(payload: unknown, user: types.ILocalUser): Promise<void> {
    await this.addExpController.addExp(payload as IAddExpDto);
    const updatedUser = await this.getController.getById({ id: (payload as IAddExpDto).profileId });
    return State.broker.send(user.tempId, updatedUser, enums.EMessageTypes.Send);
  }

  async addBasic(user: string, party: string, inventory: string, stats: string): Promise<string> {
    return this.addBasicController.add({ user, party, inventory, stats } as IAddBasicProfileDto);
  }

  async remove(id: string): Promise<void> {
    return this.removeController.remove({ id } as IRemoveProfileDto);
  }

  async changeState(payload: unknown, user: types.ILocalUser): Promise<void> {
    await this.characterStateController.changeState(payload as ChangeCharacterStatusDto, user);
    return State.broker.send(user.tempId, undefined, enums.EMessageTypes.Send);
  }
}
