import GetCharacterDto from './dto';
import ControllerFactory from '../../../tools/abstract/controller';
import Rooster from '../rooster';
import type { IRemoveCharacterDto } from './types';
import type { EModules } from '../../../tools/abstract/enums';

export default class Controller extends ControllerFactory<EModules.Npc> {
  constructor() {
    super(new Rooster());
  }

  async remove(data: IRemoveCharacterDto): Promise<void> {
    const payload = new GetCharacterDto(data);

    await this.rooster.remove(payload.id);
  }
}
