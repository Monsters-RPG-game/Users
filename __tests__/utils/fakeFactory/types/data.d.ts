import type { IProfileEntity } from '../../../../src/modules/profile/entity.js';
import type Profile from '../../../../src/modules/profile/model.js';
import type { IUserEntity } from '../../../../src/modules/users/entity.js';
import type User from '../../../../src/modules/users/model.js';
import type { EFakeData } from '../enums/index.js';

export type IFakeParam<T> = {
  [P in keyof T]?: T[P];
};

export interface IFakeState {
  [EFakeData.User]: IFakeParam<IUserEntity>;
  [EFakeData.Profile]: IFakeParam<IProfileEntity>;
}

export interface IFakeModel {
  [EFakeData.User]: typeof User;
  [EFakeData.Profile]: typeof Profile;
}

export type IAbstractBody<T> = {
  [P in keyof T]: (arg?: T[P]) => IAbstractBody<T>;
};
