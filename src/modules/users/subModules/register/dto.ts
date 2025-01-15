import Validation from '../../../../tools/validation.js';
import type { IRegisterDto } from './types.js';

export default class RegisterUserDto implements IRegisterDto {
  login: string;
  oidcId: string;

  constructor(data: IRegisterDto) {
    this.login = data.login;
    this.oidcId = data.oidcId;

    this.validate();
  }

  validate(): void {
    new Validation(this.login, 'login').isDefined().isString().hasMinLength(1);
    new Validation(this.oidcId, 'oidcId').isDefined().isString().hasMinLength(1).isObjectId();
  }
}
