import AddSkillsDto from './dto';
import { ProfileDoesNotExists } from '../../../errors';
import ControllerFactory from '../../../tools/abstract/controller';
import ProfileController from '../../profile/get';
import Rooster from '../rooster';
import type { IAddSkillsDto } from './types';
import type { EModules } from '../../../tools/abstract/enums';
import type { ILocalUser } from '../../../types';

export default class Controller extends ControllerFactory<EModules.Skills> {
  private _profileController: ProfileController;
  constructor() {
    super(new Rooster());
    this._profileController = new ProfileController();
  }

  async add(data: IAddSkillsDto, user: ILocalUser): Promise<void> {
    const payload = new AddSkillsDto(data);
    console.log('payload', payload);
    console.log('payload', user);
    const exist = await this._profileController.get({ id: user.userId! });
    if (!exist) throw new ProfileDoesNotExists();
    await this.rooster.add(payload);
  }
}
