import type { ELoginOutput } from '../../enums';

export interface ILoginAttemptEntity {
  _id: string;
  login: string;
  ip: string;
  output: ELoginOutput;
}
