import Stats from './model';
import RoosterFactory from '../../tools/abstract/rooster';
import type { IStatsEntity } from './entity';
import type { IStats } from './types';
import type { EModules } from '../../tools/abstract/enums';
import type { FilterQuery } from 'mongoose';

export default class Rooster extends RoosterFactory<IStats, typeof Stats, EModules.Stats> {
  constructor() {
    super(Stats);
  }

  async getByUser(id: string): Promise<IStatsEntity | null> {
    return this.model
      .findOne({ owner: id })
      .select({
        _id: false,
        strength: true,
        intelligence: true,
        hp: true,
      })
      .lean();
  }

  async getMany(ids: string[]): Promise<IStatsEntity[]> {
    return this.model
      .find({
        _id: { $in: ids },
      })
      .select({
        _id: true,
        strength: true,
        intelligence: true,
        hp: true,
      })
      .lean();
  }

  override async get(_id: unknown): Promise<IStatsEntity | null> {
    return this.model
      .findOne({ _id } as FilterQuery<Record<string, unknown>>)
      .select({
        _id: false,
        strength: true,
        intelligence: true,
        hp: true,
      })
      .lean();
  }
}
