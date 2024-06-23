import AddSkillsDto from './dto';
import { ProfileDoesNotExists, SingleSkillDoesNotExist, SingleSkillPresent } from '../../../errors';
import ControllerFactory from '../../../tools/abstract/controller';
import ProfileController from '../../profile/get';
import SingleSkillController from '../../singleSkill/get';
import Rooster from '../rooster';
import type { IAddSkillsDto } from './types';
import type { EModules } from '../../../tools/abstract/enums';

export default class Controller extends ControllerFactory<EModules.Skills> {
  private _profileController: ProfileController;
  private _singleSkillController: SingleSkillController;
  constructor() {
    super(new Rooster());
    this._profileController = new ProfileController();
    this._singleSkillController = new SingleSkillController();
  }

  public get singleSkillController(): SingleSkillController {
    return this._singleSkillController;
  }

  public get profileController(): ProfileController {
    return this._profileController;
  }

  async add(data: IAddSkillsDto): Promise<void> {
    const payload = new AddSkillsDto(data);
    const exist = await this.profileController.get({ id: data.owner });
    if (!exist) throw new ProfileDoesNotExists();

    const profileSkills = await this.rooster.get(exist.skills);
    const singleSkill = await this.singleSkillController.get({ id: payload.singleSkillId });
    if (!singleSkill) throw new SingleSkillDoesNotExist();

    if (!profileSkills?.singleSkills) {
      await this.rooster.update(profileSkills!._id, {
        singleSkills: [{ skillId: singleSkill._id.toString() }],
      });
    }

    if (profileSkills?.singleSkills) {
      const skillPresent = profileSkills.singleSkills.find(
        (e) => e.skillId.toString() === payload.singleSkillId.toString(),
      );
      if (skillPresent) throw new SingleSkillPresent();
      await this.rooster.update(profileSkills._id, {
        singleSkills: [...profileSkills.singleSkills, { skillId: singleSkill._id.toString() }],
      });
    }
  }
}
