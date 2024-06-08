import Validation from '../../../tools/validation';
import type { IAddExpDto } from './types';

export default class AddExpDto implements IAddExpDto {
  profileId: string;
  exp: number;

  constructor(data: IAddExpDto) {
    this.profileId = data.profileId;
    this.exp = data.exp;
    this.validate();
  }

  private validate(): void {
    new Validation(this.profileId, 'profileId').isDefined().isObjectId();
    new Validation(this.exp, 'exp').isDefined().isNumber();
  }
}
