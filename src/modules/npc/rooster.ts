import Character from './model';
import RoosterFactory from '../../tools/abstract/rooster';
import type { ICharacterEntity } from './entity';
import type { ICharacter } from './types';
import type { EModules } from '../../tools/abstract/enums';
import type { FilterQuery } from 'mongoose';

export default class Rooster extends RoosterFactory<ICharacter, typeof Character, EModules.Npc> {
  constructor() {
    super(Character);
  }

  async addBasic(filter: FilterQuery<Record<string, unknown>>): Promise<ICharacterEntity[]> {
    return this.model.find(filter).lean();
  }

  async getMany(filter: FilterQuery<Record<string, unknown>>, page: number): Promise<ICharacterEntity[]> {
    return this.model
      .find(filter)
      .limit(100)
      .skip((page <= 0 ? 0 : page - 1) * 100)
      .lean();
  }

  async getByName(name: string, lvl: number): Promise<ICharacterEntity[]> {
    return this.model.find({ name, lvl }).lean();
  }

  async remove(_id: string): Promise<void> {
    await this.model.findOneAndDelete({ _id });
  }
}
