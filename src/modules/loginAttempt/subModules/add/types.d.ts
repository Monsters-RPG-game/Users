import type { ELoginOutput } from '../../../../enums/index.js';

export interface IAddLoginAttemptDto {
  login: string;
  ip: string;
  output: ELoginOutput;
}
