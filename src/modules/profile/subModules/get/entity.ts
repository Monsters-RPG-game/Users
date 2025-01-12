import type { IProfileEntity } from '../../entity.js';

export default class GetProfileEntity implements Omit<IProfileEntity, 'oidcId'> {
  _id: string;
  initialized: boolean;
  user: string;

  constructor(data: IProfileEntity) {
    this._id = data._id.toString();
    this.user = data.user;
    this.initialized = data.initialized;
  }
}
