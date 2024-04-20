import AddStatsDto from './dto';
import { ECharacterStats } from '../../../enums';
import * as errors from '../../../errors';
import ControllerFactory from '../../../tools/abstract/controller';
import Rooster from '../rooster';
import type { IAddStatsDto } from './types';
import type { EUserRace } from '../../../enums';
import type { EModules } from '../../../tools/abstract/enums';
import type { ILocalUser } from '../../../types';

export default class Controller extends ControllerFactory<EModules.Stats> {
  constructor() {
    super(new Rooster());
  }

  async add(data: IAddStatsDto, user: ILocalUser): Promise<void> {
    const payload = new AddStatsDto(data);

    const exist = await this.rooster.getByUser(user.userId!);
    if (!exist) throw new errors.ProfileDoesNotExists();
    await this.rooster.update(exist._id, { ...payload, ...this.getRaceStats(payload.race), initialized: true });
  }

  private getRaceStats(race: EUserRace): Record<ECharacterStats, number> {
    switch (race) {
      default:
        return {
          [ECharacterStats.Intelligence]: 2,
          [ECharacterStats.Strength]: 2,
        };
    }
  }
}
