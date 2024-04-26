import AddBasicCharacterDto from './dto';
import ControllerFactory from '../../../tools/abstract/controller';
import Rooster from '../rooster';
import type { IAddBasicCharacterDto } from './types';
import type { EModules } from '../../../tools/abstract/enums';

export default class Controller extends ControllerFactory<EModules.Npc> {
  constructor() {
    super(new Rooster());
  }

  async addBasic(data: IAddBasicCharacterDto): Promise<string> {
    const prepared = new AddBasicCharacterDto(data);

    return this.rooster.addDefault(prepared);
  }
}
