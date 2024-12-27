import ProfileModel from './model.js';
import ProfileRepository from './repository/index.js';
import * as enums from '../../enums/index.js';
import AddBasicProfileController from './subModules/addBasic/index.js';
import GetProfileController from './subModules/get/index.js';
import RemoveProfileController from './subModules/remove/index.js';
import AbstractController from '../../tools/abstractions/controller.js';

export default class ProfileController extends AbstractController<enums.EControllers.Profile> {
  /**
   * Register Profiles controllers.
   * @returns Void.
   */
  protected init(): void {
    const profileRepo = new ProfileRepository(ProfileModel);

    this.register(enums.EProfileActions.AddBasic, new AddBasicProfileController(profileRepo));
    this.register(enums.EProfileActions.Get, new GetProfileController(profileRepo));
    this.register(enums.EProfileActions.Remove, new RemoveProfileController(profileRepo));
  }
}
