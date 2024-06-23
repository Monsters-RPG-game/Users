import Skills from './model';
import RoosterFactory from '../../tools/abstract/rooster';
import type { ISkills } from './types';
import type { EModules } from '../../tools/abstract/enums';

export default class Rooster extends RoosterFactory<ISkills, typeof Skills, EModules.Skills> {
  constructor() {
    super(Skills);
  }
}
