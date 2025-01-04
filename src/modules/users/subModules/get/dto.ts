import { MissingArgError } from '../../../../errors/index.js';
import Validation from '../../../../tools/validation.js';
import type { IGetUserDto } from './types.js';

export default class GetUserDto implements IGetUserDto {
  name?: string;
  id?: string;
  oidcId?: string;

  constructor(data: IGetUserDto) {
    this.name = data.name;
    this.id = data.id;
    this.oidcId = data.oidcId;

    this.validate();
  }

  private validate(): void {
    if (!this.name && !this.id && !this.oidcId) throw new MissingArgError('name');

    if (this.name) new Validation(this.name, 'name').isDefined().isString();
    if (this.id) new Validation(this.id, 'id').isDefined().isString().isObjectId();
    if (this.oidcId) new Validation(this.oidcId, 'oidcId').isDefined().isString().isObjectId();
  }
}
