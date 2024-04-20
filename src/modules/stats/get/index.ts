import GetStatsDto from './dto';
import ControllerFactory from '../../../tools/abstract/controller';
import Rooster from '../rooster';
import type { IGetStatsDto } from './types';
import type { EModules } from '../../../tools/abstract/enums';
import type { IStatsEntity } from '../entity';

export default class Controller extends ControllerFactory<EModules.Stats> {
  constructor() {
    super(new Rooster());
  }

  async get(data: IGetStatsDto): Promise<IStatsEntity | null> {
    const { id } = new GetStatsDto(data);
    return this.rooster.get(id);
  }
}
