import AddExpDto from './dto';
import { ELvlRequirements } from '../../../enums/profile';
import * as errors from '../../../errors';
import ControllerFactory from '../../../tools/abstract/controller';
import Rooster from '../rooster';
import type { IAddExpDto } from './types';
import type { EModules } from '../../../tools/abstract/enums';
import type { IProfileEntity } from '../entity';

export default class Controller extends ControllerFactory<EModules.Profiles> {
  constructor() {
    super(new Rooster());
  }

  /**
   * Adds experience points to a profile and checks for level up.
   * @param data
   */
  async addExp(data: IAddExpDto): Promise<void> {
    const payload = new AddExpDto(data);
    const profile = await this.rooster.get(payload.profileId);
    if (!profile) throw new errors.ProfileDoesNotExists();

    const exp = profile.exp + data.exp;
    return this.checkForNextLevel(exp, profile);
  }

  /**
   * Checks if the profile should level up based on the new experience points.
   * If not then update profile with new amount of experience.
   * @param exp
   * @param profile
   */
  private async checkForNextLevel(exp: number, profile: IProfileEntity): Promise<void> {
    if (exp >= ELvlRequirements[`Level${profile.lvl + 1}`]) {
      return this.rooster.update(profile._id, { ...profile, exp, lvl: profile.lvl + 1 });
    }

    return this.rooster.update(profile._id, { ...profile, exp });
  }
}
