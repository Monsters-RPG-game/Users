import type * as enums from '../enums/index.js';

export interface IUserBrokerInfo {
  userId: string | undefined;
  tempId: string;
  validated: boolean;
  type: enums.EUserTypes;
}
