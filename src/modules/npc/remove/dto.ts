import Validation from '../../../tools/validation';
import type { IRemoveCharacterDto } from './types';

export default class RemoveCharacterDto implements IRemoveCharacterDto {
  id: string;

  constructor(data: IRemoveCharacterDto) {
    this.id = data.id;

    this.validate();
  }

  private validate(): void {
    new Validation(this.id, 'id').isDefined().isString();
  }
}
