import AddBasicInventoryDto from './dto';
import ControllerFactory from '../../../tools/abstract/controller';
import Rooster from '../rooster';
import type { IAddBasicInventoryDto } from './types';
import type { EModules } from '../../../tools/abstract/enums';

export default class Controller extends ControllerFactory<EModules.Inventory> {
  constructor() {
    super(new Rooster());
  }

  async add(data: IAddBasicInventoryDto): Promise<string> {
    const payload = new AddBasicInventoryDto(data);
    return this.rooster.addDefault(payload);
  }
}
