import Validation from '../../../tools/validation';
import type { IRemoveUserDto } from './types';

export default class RemoveUserDto implements IRemoveUserDto {
  id: string;
  password: string;

  constructor(data: IRemoveUserDto, userId: string) {
    this.password = data.password;
    this.id = userId;

    this.validate();
  }

  validate(): void {
    new Validation(this.id, 'id').isDefined().isString().isObjectId();
    new Validation(this.password, 'password').isDefined().isString();
  }
}
