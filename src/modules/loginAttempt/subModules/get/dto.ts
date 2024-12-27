import Validation from '../../../../tools/validation.js';
import type { IGetLoginAttemptDto } from './types.js';

export default class GetLoginAttemptDto implements IGetLoginAttemptDto {
  login: string;

  constructor(data: IGetLoginAttemptDto) {
    this.login = data.login;

    this.validate();
  }

  validate(): void {
    new Validation(this.login, 'login').isDefined().isString();
  }
}
