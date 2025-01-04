import Validation from '../../../../tools/validation.js';
import type { IRemoveUserDto } from './types.js';

export default class RemoveUserDto implements IRemoveUserDto {
  userId: string;

  constructor(userId: string) {
    this.userId = userId;

    this.validate();
  }

  validate(): void {
    new Validation(this.userId, 'userId').isDefined().isString().isObjectId();
  }
}
