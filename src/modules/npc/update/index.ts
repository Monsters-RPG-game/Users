import AddCharacterDto from './dto';
import * as errors from '../../../errors';
import ControllerFactory from '../../../tools/abstract/controller';
import Rooster from '../rooster';
import type { IUpdateCharacterDto } from './types';
import type { EModules } from '../../../tools/abstract/enums';

export default class Controller extends ControllerFactory<EModules.Npc> {
  constructor() {
    super(new Rooster());
  }

  async update(data: IUpdateCharacterDto): Promise<void> {
    const payload = new AddCharacterDto(data);

    const exist = await this.rooster.get(payload.id);
    if (!exist) throw new errors.ProfileDoesNotExists();
    await this.rooster.update(payload.id, { lvl: payload.lvl, name: payload.name, race: payload.race });
  }
}
