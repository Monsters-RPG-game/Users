import Validation from '../../../../tools/validation.js';
import type { IRemoveProfileDto } from './types.js';

export default class RemoveProfileDto implements IRemoveProfileDto {
  id: string;

  constructor(data: IRemoveProfileDto) {
    this.id = data.id;

    this.validate();
  }

  private validate(): void {
    new Validation(this.id, 'id').isDefined().isString().isObjectId();
  }
}
