import { EUserRace } from '../../../enums';
import Validation from '../../../tools/validation';
import type { IAddProfileDto } from './types';

export default class AddProfileDto implements IAddProfileDto {
  location: string;
  race: EUserRace = EUserRace.Human;

  constructor(data: IAddProfileDto) {
    this.race = data.race;
    this.location = data.location;

    this.validate();
  }

  private validate(): void {
    new Validation(this.race, 'race').isDefined().isString().isPartOfEnum(EUserRace);
    new Validation(this.location, 'location').isDefined().isString().isObjectId();
  }
}
