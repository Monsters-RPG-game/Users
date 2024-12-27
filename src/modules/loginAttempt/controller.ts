import LoginAttemptModel from './model.js';
import LoginAttemptRepository from './repository/index.js';
import * as enums from '../../enums/index.js';
import AddController from './subModules/add/index.js';
import GetController from './subModules/get/index.js';
import AbstractController from '../../tools/abstractions/controller.js';

export default class LoginAttemptController extends AbstractController<enums.EControllers.LoginAttempt> {
  /**
   * Register login attempt controllers.
   * @returns Void.
   */
  protected init(): void {
    const loginAttemptRepo = new LoginAttemptRepository(LoginAttemptModel);

    this.register(enums.ELoginAttemptActions.Get, new GetController(loginAttemptRepo));
    this.register(enums.ELoginAttemptActions.Add, new AddController(loginAttemptRepo));
  }
}
