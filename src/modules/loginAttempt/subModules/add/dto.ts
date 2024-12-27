import { ELoginOutput } from '../../../../enums/index.js';
import Validation from '../../../../tools/validation.js';
import type { IAddLoginAttemptDto } from './types.js';

export default class AddLoginAttemptDto implements IAddLoginAttemptDto {
  login: string;
  ip: string;
  output: ELoginOutput;

  constructor(data: IAddLoginAttemptDto) {
    this.login = data.login;
    this.ip = data.ip;
    this.output = data.output;

    this.validate();
  }

  validate(): void {
    new Validation(this.login, 'login').isDefined().isString();
    new Validation(this.ip, 'ip').isDefined().isString();
    new Validation(this.output, 'output').isDefined().isString().isPartOfEnum(ELoginOutput);
  }
}
