import AddSkillsDto from './dto';
import ControllerFactory from '../../../tools/abstract/controller';
import Rooster from '../rooster';
import type { IAddSkillsDto } from './types';
import type { EModules } from '../../../tools/abstract/enums';

export default class Controller extends ControllerFactory<EModules.Skills> {
  constructor() {
    super(new Rooster());
  }

  async get(data: IAddSkillsDto): Promise<void> {
    const payload = new AddSkillsDto(data);
    await this.rooster.add(payload);
  }
}
