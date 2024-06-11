import AddBasicSkillsDto from './dto';
import ControllerFactory from '../../../tools/abstract/controller';
import Rooster from '../rooster';
import type { IAddBasicSkillsDto } from './types';
import type { EModules } from '../../../tools/abstract/enums';

export default class Controller extends ControllerFactory<EModules.Skills> {
  constructor() {
    super(new Rooster());
  }

  async addBasic(data: IAddBasicSkillsDto): Promise<string> {
    const payload = new AddBasicSkillsDto(data);
    return this.rooster.addDefault(payload);
  }
}
