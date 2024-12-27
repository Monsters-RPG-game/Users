import Validation from '../../../../tools/validation.js';
import type { IGetUserDto } from './types.js';

export default class GetUserDto implements IGetUserDto {
  name?: string;
  id?: string;

  constructor(data: IGetUserDto) {
    this.name = data.name;
    this.id = data.id;

    this.validate();
  }

  private validate(): void {
    if (!this.name) {
      new Validation(this.id, 'id').isDefined().isString().isObjectId();
    }

    if (!this.id) {
      new Validation(this.name, 'name').isDefined().isString();
    }

    if (this.id && this.name) {
      new Validation(this.name, 'name').isDefined().isString();
      new Validation(this.id, 'id').isDefined().isString().isObjectId();
    }
  }
}
