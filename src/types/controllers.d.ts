import type * as enums from '../enums/index.js';
import type LoginAttemptController from '../modules/loginAttempt/controller.js';
import type AddLoginAttemptController from '../modules/loginAttempt/subModules/add/index.js';
import type GetLoginAttemptController from '../modules/loginAttempt/subModules/get/index.js';
import type ProfileController from '../modules/profile/controller.js';
import type AddBasicProfileSubController from '../modules/profile/subModules/addBasic/index.js';
import type GetProfileSubController from '../modules/profile/subModules/get/index.js';
import type RemoveProfileSubController from '../modules/profile/subModules/remove/index.js';
import type UsersController from '../modules/users/controller.js';
import type GetUserSubController from '../modules/users/subModules/get/index.js';
import type GetAllUsersSubController from '../modules/users/subModules/getAll/index.js';
import type LoginUserSubController from '../modules/users/subModules/login/index.js';
import type RegisterUserSubController from '../modules/users/subModules/register/index.js';
import type RemoveUserSubController from '../modules/users/subModules/remove/index.js';

export type IControllerActions = enums.EUserActions | enums.EProfileActions | enums.ELoginAttemptActions;

type IControllerActionsMap = {
  [K in IControllerActions]: unknown;
};

export interface IProfilesControllers extends IControllerActionsMap {
  [enums.EProfileActions.Get]: GetProfileSubController;
  [enums.EProfileActions.AddBasic]: AddBasicProfileSubController;
  [enums.EProfileActions.Remove]: RemoveProfileSubController;
}

export interface ILoginAttemptControllers extends IControllerActionsMap {
  [enums.ELoginAttemptActions.Get]: GetLoginAttemptController;
  [enums.ELoginAttemptActions.Add]: AddLoginAttemptController;
}

export interface IUserControllers extends IControllerActionsMap {
  [enums.EUserActions.Get]: GetUserSubController;
  [enums.EUserActions.Remove]: RemoveUserSubController;
  [enums.EUserActions.Login]: LoginUserSubController;
  [enums.EUserActions.GetAll]: GetAllUsersSubController;
  [enums.EUserActions.Register]: RegisterUserSubController;
}

export interface IController {
  [enums.EControllers.Users]: UsersController;
  [enums.EControllers.Profile]: ProfileController;
  [enums.EControllers.LoginAttempt]: LoginAttemptController;
}

export interface IInnerController {
  [enums.EControllers.Users]: IUserControllers;
  [enums.EControllers.Profile]: IProfilesControllers;
  [enums.EControllers.LoginAttempt]: ILoginAttemptControllers;
}
