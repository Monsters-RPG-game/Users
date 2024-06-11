import Skills from './model';
import RoosterFactory from '../../tools/abstract/rooster';
import type { ISkills } from './types';
import type { EModules } from '../../tools/abstract/enums';

export default class Rooster extends RoosterFactory<ISkills, typeof Skills, EModules.Skills> {
  constructor() {
    super(Skills);
  }

  // async getByUser(id: string): Promise<IInventoryEntity | null> {
  //   return this.model.findOne({ userId: id }).lean();
  // }
  //
  // async remove(user: string): Promise<null> {
  //   return this.model.findOneAndDelete({ userId: user });
  // }
  //
  // override async update(id: string, data: Partial<IInventoryEntity>): Promise<void> {
  //   await this.model.findOneAndUpdate({ userId: id }, data);
  // }
}
