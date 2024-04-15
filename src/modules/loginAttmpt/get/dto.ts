import Validation from '../../../tools/validation';
import type { IGetLoginAttemptDto } from './types';

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
