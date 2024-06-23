import AddSingleSkillDto from './dto';
import ControllerFactory from '../../../tools/abstract/controller';
import Rooster from '../rooster';
import type { IAddSingleSkillDto } from './types';
import type { EModules } from '../../../tools/abstract/enums';

export default class Controller extends ControllerFactory<EModules.SingleSkill> {
  constructor() {
    super(new Rooster());
  }

  async add(data: IAddSingleSkillDto): Promise<void> {
    const payload = new AddSingleSkillDto(data);
    await this.rooster.add(payload);
  }
}
