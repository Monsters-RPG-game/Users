import type * as enums from '../enums/index.js';
import type { IProfileEntity } from '../modules/profile/entity.js';
import type { IAddBasicProfileDto } from '../modules/profile/subModules/addBasic/types.js';
import type { IUserEntity } from '../modules/users/entity.js';
import type { IRegisterDto } from '../modules/users/subModules/register/types.js';

export interface IRepositoryAddData {
  [enums.EControllers.Users]: IRegisterDto;
  [enums.EControllers.Profile]: undefined;
}

export interface IRepositoryAddDefaultData {
  [enums.EControllers.Users]: Partial<IUserEntity>;
  [enums.EControllers.Profile]: IAddBasicProfileDto;
}

export interface IRepositoryGetData {
  [enums.EControllers.Users]: IUserEntity | null;
  [enums.EControllers.Profile]: IProfileEntity | null;
}

export interface IRepositoryUpdate {
  [enums.EControllers.Users]: Partial<IUserEntity>;
  [enums.EControllers.Profile]: Partial<IProfileEntity>;
}

export interface IAbstractRepository<Z extends enums.EControllers> {
  add(data: IRepositoryAddData[Z]): Promise<string>;

  get(data: unknown): Promise<IRepositoryGetData[Z]>;
}
