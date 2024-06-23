import FakeInventory from './inventory';
import FakeParty from './party';
import FakeProfile from './profile';
import FakeSingleSkill from './singleSkill';
import FakeSkills from './skills';
import FakeStats from './stats';
import FakeUser from './user';

export default class FakeFactory {
  private readonly _user: FakeUser;
  private readonly _profile: FakeProfile;
  private readonly _inventory: FakeInventory;
  private readonly _party: FakeParty;
  private readonly _stats: FakeStats;
  private readonly _singleSkill: FakeSingleSkill;
  private readonly _skills: FakeSkills;

  constructor() {
    this._user = new FakeUser();
    this._profile = new FakeProfile();
    this._inventory = new FakeInventory();
    this._party = new FakeParty();
    this._stats = new FakeStats();
    this._singleSkill = new FakeSingleSkill();
    this._skills = new FakeSkills();
  }

  get user(): FakeUser {
    return this._user;
  }

  get profile(): FakeProfile {
    return this._profile;
  }

  get stats(): FakeStats {
    return this._stats;
  }

  get inventory(): FakeInventory {
    return this._inventory;
  }

  get party(): FakeParty {
    return this._party;
  }

  get singleSkill(): FakeSingleSkill {
    return this._singleSkill;
  }

  get skills(): FakeSkills {
    return this._skills;
  }

  async cleanUp(): Promise<void> {
    await this.user.cleanUp();
    await this.profile.cleanUp();
    await this.singleSkill.cleanUp();
    await this.inventory.cleanUp();
    await this.party.cleanUp();
    await this.skills.cleanUp();
  }
}
