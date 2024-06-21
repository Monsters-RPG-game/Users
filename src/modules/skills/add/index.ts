import AddSkillsDto from './dto';
import { ProfileDoesNotExists } from '../../../errors';
import ControllerFactory from '../../../tools/abstract/controller';
import ProfileController from '../../profile/get';
import SingleSkillController from '../../singleSkill/get';
import Rooster from '../rooster';
import type { IAddSkillsDto } from './types';
import type { EModules } from '../../../tools/abstract/enums';
import type { ILocalUser } from '../../../types';

export default class Controller extends ControllerFactory<EModules.Skills> {
  private _profileController: ProfileController;
  private _singleSkillController: SingleSkillController;
  constructor() {
    super(new Rooster());
    this._profileController = new ProfileController();
    this._singleSkillController = new SingleSkillController();
  }

  async add(data: IAddSkillsDto, user: ILocalUser): Promise<void> {
    const payload = new AddSkillsDto(data);
    const exist = await this._profileController.get({ id: user.userId! });
    if (!exist) throw new ProfileDoesNotExists();
    const profileSkills = await this.rooster.get(exist.skills);
    const singleSkill = await this._singleSkillController.get({ id: payload.singleSkillId });

    if (!profileSkills?.singleSkills) {
      await this.rooster.update(profileSkills!._id, {
        singleSkills: [{ skillId: singleSkill._id.toString() }],
      });
    }
    if (profileSkills?.singleSkills) {
      await this.rooster.update(profileSkills._id, {
        singleSkills: [...profileSkills.singleSkills, { skillId: singleSkill._id.toString() }],
      });
    }
  }
}
