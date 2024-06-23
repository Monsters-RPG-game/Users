import GetSingleSkillDto from './dto';
import { SingleSkillDoesNotExist } from '../../../errors';
import ControllerFactory from '../../../tools/abstract/controller';
import Rooster from '../rooster';
import type { IGetSingleSkillDto } from './types';
import type { EModules } from '../../../tools/abstract/enums';
import type { ISingleSkillEntity } from '../entity';

export default class Controller extends ControllerFactory<EModules.SingleSkill> {
  constructor() {
    super(new Rooster());
  }

  async get(data: IGetSingleSkillDto): Promise<ISingleSkillEntity> {
    const payload = new GetSingleSkillDto(data);
    const skill = await this.rooster.get(payload.id);
    if (!skill) throw new SingleSkillDoesNotExist();

    return skill;
  }
}
