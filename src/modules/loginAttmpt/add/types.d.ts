import type { ELoginOutput } from '../../../enums';

export interface IAddLoginAttemptDto {
  login: string;
  ip: string;
  output: ELoginOutput;
}
