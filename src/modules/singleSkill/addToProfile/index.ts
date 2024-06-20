// import AddToProfileDto from './dto';
// import { ProfileDoesNotExists, SingleSkillDoesNotExist } from '../../../errors';
import ControllerFactory from '../../../tools/abstract/controller';
import ProfileGetController from '../../profile/get';
import SkillsAddController from '../../skills/add';
import SkillsGetController from '../../skills/get';
import Rooster from '../rooster';
// import type { IAddToProfileDto } from './types';
import type { EModules } from '../../../tools/abstract/enums';

export default class Controller extends ControllerFactory<EModules.SingleSkill> {
  private _profileGetController: ProfileGetController;
  private _skillsGetController: SkillsGetController;
  private _skillsAddController: SkillsAddController;
  constructor() {
    super(new Rooster());
    this._profileGetController = new ProfileGetController();
    this._skillsGetController = new SkillsGetController();
    this._skillsAddController = new SkillsAddController();
  }

  public get profileGetController(): ProfileGetController {
    return this._profileGetController;
  }

  public get skillsGetController(): SkillsGetController {
    return this._skillsGetController;
  }

  public get skillsAddController(): SkillsAddController {
    return this._skillsAddController;
  }

  // async addToProfile(data: IAddToProfileDto): Promise<void> {
  //   const { singleSkillId, profileId } = new AddToProfileDto(data);
  //
  //   const profile = await this.profileGetController.getById({ id: profileId });
  //   if (!profile) throw new ProfileDoesNotExists();
  //
  //   const singleSkill = await this.rooster.get(singleSkillId);
  //   if (!singleSkill) throw new SingleSkillDoesNotExist();
  //
  //   await this.skillsAddController
  // }
}
