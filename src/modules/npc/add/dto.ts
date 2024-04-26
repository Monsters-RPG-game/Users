import Validation from '../../../tools/validation';
import type { IAddCharacterDto } from './types';

export default class AddCharacterDto implements IAddCharacterDto {
  party: string;
  inventory: string;
  stats: string;

  constructor(data: IAddCharacterDto) {
    this.party = data.party;
    this.inventory = data.inventory;
    this.stats = data.stats;

    this.validate();
  }

  private validate(): void {
    new Validation(this.party, 'party').isDefined().isObjectId();
    new Validation(this.stats, 'stats').isDefined().isObjectId();
    new Validation(this.inventory, 'inventory').isDefined().isObject();
  }
}
