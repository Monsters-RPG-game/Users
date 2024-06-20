import Controller from './controller';
import * as enums from '../../enums';
import * as errors from '../../errors';
import BugReportController from '../../modules/bugReport/handler';
import InventoryController from '../../modules/inventory/handler';
import NpcController from '../../modules/npc/handler';
import PartyController from '../../modules/party/handler';
import ProfileController from '../../modules/profile/handler';
import SingleSkillController from '../../modules/singleSkill/handler';
import SkillsController from '../../modules/skills/handler';
import StatsController from '../../modules/stats/handler';
import UserController from '../../modules/user/handler';
import type * as types from '../../types/connection';

export default class Handler {
  private readonly _user: UserController;
  private readonly _party: PartyController;
  private readonly _profile: ProfileController;
  private readonly _inventory: InventoryController;
  private readonly _controller: Controller;
  private readonly _bugReport: BugReportController;
  private readonly _stats: StatsController;
  private readonly _npc: NpcController;
  private readonly _singleSkill: SingleSkillController;
  private readonly _skills: SkillsController;

  constructor() {
    this._user = new UserController();
    this._profile = new ProfileController();
    this._inventory = new InventoryController();
    this._party = new PartyController();
    this._bugReport = new BugReportController();
    this._npc = new NpcController();
    this._stats = new StatsController();
    this._singleSkill = new SingleSkillController();
    this._skills = new SkillsController();
    this._controller = new Controller(
      this.user,
      this.profile,
      this.inventory,
      this.party,
      this.stats,
      this.skills,
      this.npc,
    );
  }

  private get user(): UserController {
    return this._user;
  }

  private get stats(): StatsController {
    return this._stats;
  }

  private get inventory(): InventoryController {
    return this._inventory;
  }

  private get party(): PartyController {
    return this._party;
  }

  private get bugReport(): BugReportController {
    return this._bugReport;
  }

  private get profile(): ProfileController {
    return this._profile;
  }

  private get npc(): NpcController {
    return this._npc;
  }

  private get skills(): SkillsController {
    return this._skills;
  }

  private get singleSkill(): SingleSkillController {
    return this._singleSkill;
  }

  private get controller(): Controller {
    return this._controller;
  }

  async profileMessage(payload: types.IRabbitMessage): Promise<void> {
    switch (payload.subTarget) {
      case enums.EProfileTargets.Create:
        return this.controller.createProfile(payload.payload, payload.user);
      case enums.EProfileTargets.Get:
        return this.profile.get(payload.payload, payload.user);
      case enums.EProfileTargets.AddExp:
        return this.profile.addExp(payload.payload, payload.user);
      default:
        throw new errors.IncorrectTargetError();
    }
  }

  async userMessage(payload: types.IRabbitMessage): Promise<void> {
    switch (payload.subTarget) {
      case enums.EUserTargets.Login:
        return this.user.login(payload.payload, payload.user);
      case enums.EUserTargets.Register:
        return this.controller.register(payload.payload, payload.user);
      case enums.EUserTargets.GetName:
        return this.user.getDetails(payload.payload, payload.user);
      case enums.EUserTargets.DebugGetAll:
        return this.user.getAll(payload.payload, payload.user);
      case enums.ESharedTargets.RemoveUser:
        return this.controller.removeUser(payload.payload, payload.user);
      default:
        throw new errors.IncorrectTargetError();
    }
  }

  async characterStateMessage(payload: types.IRabbitMessage): Promise<void> {
    switch (payload.subTarget) {
      case enums.ECharacterStateTargets.ChangeState:
        return this.profile.changeState(payload.payload, payload.user);
      default:
        throw new errors.IncorrectTargetError();
    }
  }

  async inventoryMessage(payload: types.IRabbitMessage): Promise<void> {
    switch (payload.subTarget) {
      case enums.EItemsTargets.Get:
        return this.inventory.get(payload.user);
      case enums.EItemsTargets.Use:
        return this.inventory.useItem(payload.payload, payload.user);
      case enums.EItemsTargets.Drop:
        return this.inventory.dropItem(payload.payload, payload.user);
      default:
        throw new errors.IncorrectTargetError();
    }
  }

  async partyMessage(payload: types.IRabbitMessage): Promise<void> {
    switch (payload.subTarget) {
      case enums.EPartyTargets.Get:
        return this.party.get(payload.payload, payload.user);
      case enums.EPartyTargets.Create:
        return this.party.create(payload.payload, payload.user);
      default:
        throw new errors.IncorrectTargetError();
    }
  }

  async bugReportMessage(payload: types.IRabbitMessage): Promise<void> {
    switch (payload.subTarget) {
      case enums.EBugReportTargets.AddBugReport:
        return this.bugReport.add(payload.payload, payload.user);
      case enums.EBugReportTargets.GetBugReport:
        return this.bugReport.get(payload.payload, payload.user);
      default:
        throw new errors.IncorrectTargetError();
    }
  }

  async statsMessage(payload: types.IRabbitMessage): Promise<void> {
    switch (payload.subTarget) {
      case enums.EStatsTargets.GetStats:
        return this.stats.get(payload.payload, payload.user);
      default:
        throw new errors.IncorrectTargetError();
    }
  }

  async skillsMessage(payload: types.IRabbitMessage): Promise<void> {
    switch (payload.subTarget) {
      case enums.ESkillsTargets.GetSkills:
        return this.skills.get(payload.payload, payload.user);
      case enums.ESkillsTargets.AddSkills:
        return this.skills.add(payload.payload, payload.user);
      default:
        throw new errors.IncorrectTargetError();
    }
  }

  async singleSkillMessage(payload: types.IRabbitMessage): Promise<void> {
    switch (payload.subTarget) {
      case enums.ESingleSkillTargets.GetSingleSkill:
        return this.singleSkill.get(payload.payload, payload.user);
      case enums.ESingleSkillTargets.AddSingleSkill:
        return this.singleSkill.add(payload.payload, payload.user);
      default:
        throw new errors.IncorrectTargetError();
    }
  }

  async npcMessages(payload: types.IRabbitMessage): Promise<void> {
    switch (payload.subTarget) {
      case enums.ENpcTargets.GetNpc:
        return this.npc.get(payload.payload, payload.user); // GET/npc
      case enums.ENpcTargets.AddNpc:
        return this.controller.createNpc(payload.payload, payload.user);
      case enums.ENpcTargets.UpdateNpc:
        return this.npc.update(payload.payload, payload.user);
      case enums.ENpcTargets.RemoveNpc:
        return this.npc.remove(payload.payload, payload.user);
      default:
        throw new errors.IncorrectTargetError();
    }
  }
}
