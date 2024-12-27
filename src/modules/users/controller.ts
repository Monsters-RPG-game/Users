import UserModel from './model.js';
import UserRepository from './repository/index.js';
import * as enums from '../../enums/index.js';
import GetController from './subModules/get/index.js';
import GetAllUsersController from './subModules/getAll/index.js';
import LoginUserController from './subModules/login/index.js';
import RegisterUserController from './subModules/register/index.js';
import RemoveUserController from './subModules/remove/index.js';
import AbstractController from '../../tools/abstractions/controller.js';

export default class UserController extends AbstractController<enums.EControllers.Users> {
  /**
   * Register users controllers.
   * @returns Void.
   */
  protected init(): void {
    const userRepo = new UserRepository(UserModel);

    this.register(enums.EUserActions.Get, new GetController(userRepo));
    this.register(enums.EUserActions.GetAll, new GetAllUsersController(userRepo));
    this.register(enums.EUserActions.Login, new LoginUserController(userRepo));
    this.register(enums.EUserActions.Register, new RegisterUserController(userRepo));
    this.register(enums.EUserActions.Remove, new RemoveUserController(userRepo));
  }
}
