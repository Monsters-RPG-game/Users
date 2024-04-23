import AddCharacterDto from './dto';
import * as errors from '../../../errors';
import ControllerFactory from '../../../tools/abstract/controller';
import Rooster from '../rooster';
import type { IAddCharacterDto } from './types';
import type { EModules } from '../../../tools/abstract/enums';

export default class Controller extends ControllerFactory<EModules.Npc> {
  constructor() {
    super(new Rooster());
  }

  async add(data: IAddCharacterDto, characterId: string): Promise<void> {
    const payload = new AddCharacterDto(data);

    const exist = await this.rooster.get(characterId);
    if (!exist) throw new errors.ProfileDoesNotExists();
    await this.rooster.update(characterId, payload);
  }
}
