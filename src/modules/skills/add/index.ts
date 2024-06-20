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
    console.log('pay', payload);
    const exist = await this._profileController.get({ id: user.userId! });
    if (!exist) throw new ProfileDoesNotExists();
    console.log('PROFILE', exist);
    const profileSkills = await this.rooster.get(exist.skills);
    const singleSkill = await this._singleSkillController.get({ id: payload.singleSkillId });
    console.log('profileSkillsId', profileSkills!._id);
    console.log('owner', profileSkills!.owner);
    console.log('skills', singleSkill);

    if (!profileSkills?.singleSkills) {
      await this.rooster.update(profileSkills!._id, {
        singleSkills: [{ skillId: singleSkill._id.toString() }],
      });
    }
    if (profileSkills?.singleSkills) {
      await this.rooster.update(profileSkills._id, {
        singleSkills: [...profileSkills.singleSkills,{ skillId: singleSkill._id.toString() }],
      });
    }
    // await this.rooster.update(exist.skills,)
    //
  }
}
