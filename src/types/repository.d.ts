import type * as enums from '../enums/index.js';
import type { ILoginAttemptEntity } from '../modules/loginAttempt/entity.js';
import type { IAddLoginAttemptDto } from '../modules/loginAttempt/subModules/add/types.js';
import type { IProfileEntity } from '../modules/profile/entity.js';
import type { IAddBasicProfileDto } from '../modules/profile/subModules/addBasic/types.js';
import type { IUserEntity } from '../modules/users/entity.js';
import type { IRegisterDto } from '../modules/users/subModules/register/types.js';

export interface IRepositoryAddData {
  [enums.EControllers.Users]: IRegisterDto;
  [enums.EControllers.Profile]: undefined;
  [enums.EControllers.LoginAttempt]: IAddLoginAttemptDto;
}

export interface IRepositoryAddDefaultData {
  [enums.EControllers.Users]: Partial<IUserEntity>;
  [enums.EControllers.Profile]: IAddBasicProfileDto;
  [enums.EControllers.LoginAttempt]: Partial<ILoginAttemptEntity>;
}

export interface IRepositoryGetData {
  [enums.EControllers.Users]: IUserEntity | null;
  [enums.EControllers.Profile]: IProfileEntity | null;
  [enums.EControllers.LoginAttempt]: ILoginAttemptEntity | null;
}

export interface IRepositoryUpdate {
  [enums.EControllers.Users]: Partial<IUserEntity>;
  [enums.EControllers.Profile]: Partial<IProfileEntity>;
  [enums.EControllers.LoginAttempt]: Partial<ILoginAttemptEntity>;
}

export interface IAbstractRepository<Z extends enums.EControllers> {
  add(data: IRepositoryAddData[Z]): Promise<string>;

  get(data: unknown): Promise<IRepositoryGetData[Z]>;
}
