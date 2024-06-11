import GetSkillsDto from './dto';
import ControllerFactory from '../../../tools/abstract/controller';
import Rooster from '../rooster';
import type { IGetSkillsDto } from './types';
import type { EModules } from '../../../tools/abstract/enums';
import type { ISkillsEntity } from '../entity';

export default class Controller extends ControllerFactory<EModules.Skills> {
  constructor() {
    super(new Rooster());
  }

  async get(data: IGetSkillsDto): Promise<ISkillsEntity | null> {
    const { id } = new GetSkillsDto(data);
    return this.rooster.get(id);
  }
}
