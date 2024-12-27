import Validation from '../../../../tools/validation.js';
import type { IAddBasicProfileDto } from './types.js';

export default class AddBasicProfileDto implements IAddBasicProfileDto {
  user: string;

  constructor(data: IAddBasicProfileDto) {
    this.user = data.user;

    this.validate();
  }

  private validate(): void {
    new Validation(this.user, 'user').isDefined().isString().isObjectId();
  }
}
