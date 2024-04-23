import * as enums from '../../enums';
import RemoveUserDto from '../../modules/user/remove/dto';
import State from '../../tools/state';
import type InventoryController from '../../modules/inventory/handler';
import type { IAddCharacterDto } from '../../modules/npc/add/types';
import type { IAddBasicCharacterDto } from '../../modules/npc/addBasic/types';
import type NpcController from '../../modules/npc/handler';
import type PartyController from '../../modules/party/handler';
import type { IAddProfileDto } from '../../modules/profile/add/types';
import type ProfileController from '../../modules/profile/handler';
import type { IAddStatsDto } from '../../modules/stats/add/types';
import type StatsController from '../../modules/stats/handler';
import type UserController from '../../modules/user/handler';
import type { IRegisterDto } from '../../modules/user/register/types';
import type { IRemoveUserDto } from '../../modules/user/remove/types';
import type { ILocalUser } from '../../types';

export default class Controller {
  private readonly _user: UserController;
  private readonly _profile: ProfileController;
  private readonly _inventory: InventoryController;
  private readonly _party: PartyController;
  private readonly _stats: StatsController;
  private readonly _npc: NpcController;

  constructor(
    user: UserController,
    profile: ProfileController,
    inventory: InventoryController,
    party: PartyController,
    stats: StatsController,
    npc: NpcController,
  ) {
    this._user = user;
    this._profile = profile;
    this._inventory = inventory;
    this._party = party;
    this._party = party;
    this._stats = stats;
    this._npc = npc;
  }

  private get user(): UserController {
    return this._user;
  }

  private get npc(): NpcController {
    return this._npc;
  }

  private get profile(): ProfileController {
    return this._profile;
  }

  private get party(): PartyController {
    return this._party;
  }

  private get stats(): StatsController {
    return this._stats;
  }

  private get inventory(): InventoryController {
    return this._inventory;
  }

  async removeUser(payload: unknown, user: ILocalUser): Promise<void> {
    const { password, id } = new RemoveUserDto(payload as IRemoveUserDto, user.userId as string);

    await this.user.remove(password, id);
    await this.profile.remove(id);
    await this.party.remove(id);
    await this.inventory.remove(id);

    return State.broker.send(user.tempId, undefined, enums.EMessageTypes.Send);
  }

  async register(payload: unknown, user: ILocalUser): Promise<void> {
    const id = (await this.user.register(payload as IRegisterDto)).toString();

    const party = await this.party.addBasic(id);
    const inventory = await this.inventory.addBasic(id);
    const stats = await this.stats.addBasic(id);
    await this.profile.addBasic(id, party, inventory, stats);

    return State.broker.send(user.tempId, undefined, enums.EMessageTypes.Send);
  }

  async createProfile(payload: unknown, user: ILocalUser): Promise<void> {
    await this.profile.add(payload as IAddProfileDto, user);
    await this.stats.add(payload as IAddStatsDto, user);

    return State.broker.send(user.tempId, undefined, enums.EMessageTypes.Send);
  }

  async createNpc(payload: unknown, user: ILocalUser): Promise<void> {
    const id = (await this.npc.addBasic(payload as IAddBasicCharacterDto)).toString();

    const party = await this.party.addBasic(id);
    const inventory = await this.inventory.addBasic(id);
    const stats = await this.stats.addBasic(id);

    await this.npc.add(
      {
        party,
        inventory,
        stats,
      } as IAddCharacterDto,
      id,
    );
    await this.stats.add({ race: (payload as IAddBasicCharacterDto).race }, user);

    return State.broker.send(user.tempId, undefined, enums.EMessageTypes.Send);
  }
}
