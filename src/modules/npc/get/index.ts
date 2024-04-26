import GetCharacterDto from './dto';
import ControllerFactory from '../../../tools/abstract/controller';
import Rooster from '../rooster';
import type { IGetCharacterDto } from './types';
import type { EModules } from '../../../tools/abstract/enums';
import type { ICharacterEntity } from '../entity';

export default class Controller extends ControllerFactory<EModules.Npc> {
  constructor() {
    super(new Rooster());
  }

  async get(data: IGetCharacterDto): Promise<ICharacterEntity[]> {
    const payload = new GetCharacterDto(data);

    const filter: { [key: string]: unknown } = {};
    if (payload.race !== undefined) filter.race = payload.race;
    if (payload.lvl !== undefined && payload.lvl !== 0) filter.lvl = payload.lvl;

    return this.rooster.getMany(filter, payload.page);
  }
}
