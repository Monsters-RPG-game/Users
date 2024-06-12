import SingleSkill from './model';
import RoosterFactory from '../../tools/abstract/rooster';
import type { ISingleSkill } from './types';
import type { EModules } from '../../tools/abstract/enums';

export default class Rooster extends RoosterFactory<ISingleSkill, typeof SingleSkill, EModules.SingleSkill> {
  constructor() {
    super(SingleSkill);
  }

  // async getByUser(id: string): Promise<IInventoryEntity | null> {
  //   return this.model.findOne({ userId: id }).lean();
  // }
  // Skills
  // async remove(user: string): Promise<null> {
  //   return this.model.findOneAndDelete({ userId: user });
  // }
  //
  // override async update(id: string, data: Partial<IInventoryEntity>): Promise<void> {
  //   await this.model.findOneAndUpdate({ userId: id }, data);
  // }
}
