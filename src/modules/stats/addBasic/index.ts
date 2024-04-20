import AddBasicStatsDto from './dto';
import ControllerFactory from '../../../tools/abstract/controller';
import Rooster from '../rooster';
import type { IAddBasicStatsDto } from './types';
import type { EModules } from '../../../tools/abstract/enums';

export default class Controller extends ControllerFactory<EModules.Stats> {
  constructor() {
    super(new Rooster());
  }

  async add(data: IAddBasicStatsDto): Promise<string> {
    const payload = new AddBasicStatsDto(data);
    return this.rooster.addDefault(payload);
  }
}
