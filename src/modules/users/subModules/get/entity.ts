import type { IUserDetails } from '../../entity.js';

export default class GetUserEntity implements Omit<IUserDetails, 'oidcId'> {
  _id: string;
  login: string;

  constructor(data: IUserDetails) {
    this._id = data._id;
    this.login = data.login;
  }
}
