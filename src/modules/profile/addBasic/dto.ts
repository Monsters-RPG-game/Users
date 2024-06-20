import Validation from '../../../tools/validation';
import type { IAddBasicProfileDto } from './types';

export default class AddBasicProfileDto implements IAddBasicProfileDto {
  user: string;
  party: string;
  inventory: string;
  stats: string;
  skills: string;

  constructor(data: IAddBasicProfileDto) {
    this.user = data.user;
    this.party = data.party;
    this.inventory = data.inventory;
    this.stats = data.stats;
    this.skills = data.skills;

    this.validate();
  }

  private validate(): void {
    new Validation(this.user, 'user').isDefined().isString().isObjectId();
    new Validation(this.party, 'party').isDefined().isString().isObjectId();
    new Validation(this.inventory, 'inventory').isDefined().isString().isObjectId();
    new Validation(this.stats, 'stats').isDefined().isString().isObjectId();
    new Validation(this.skills, 'skills').isDefined().isString().isObjectId();
  }
}
