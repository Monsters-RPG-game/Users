import GetDetailedSkillsDto from './dto';
import ControllerFactory from '../../../tools/abstract/controller';
import Rooster from '../rooster';
import type { IGetDetailedSkillsDto } from './types';
import type { EModules } from '../../../tools/abstract/enums';
import type { ISkillsEntityDetailed } from '../types';

export default class Controller extends ControllerFactory<EModules.Skills> {
  constructor() {
    super(new Rooster());
  }

  async get(data: IGetDetailedSkillsDto): Promise<ISkillsEntityDetailed | null> {
    const { id } = new GetDetailedSkillsDto(data);
    return this.rooster.getDetailed(id);
  }
}
