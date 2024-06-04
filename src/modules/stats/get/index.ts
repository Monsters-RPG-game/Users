import GetStatsDto from './dto';
import NpcController from '../../../modules/npc/get';
import ControllerFactory from '../../../tools/abstract/controller';
import Rooster from '../rooster';
import type { IGetStatsDto } from './types';
import type { EModules } from '../../../tools/abstract/enums';
import type { IStatsEntity } from '../entity';

export default class Controller extends ControllerFactory<EModules.Stats> {
  private readonly _npc: NpcController = new NpcController();

  constructor() {
    super(new Rooster());
    this._npc = new NpcController();
  }

  private get npc(): NpcController {
    return this._npc;
  }

  async get(data: IGetStatsDto): Promise<IStatsEntity | null> {
    const { id, character, lvl } = new GetStatsDto(data);
    if (id) {
      return this.rooster.get(id);
    }
    if (character && lvl) {
      const characters = await this.npc.getByName(character, lvl);
      if (characters.length > 0) {
        return this.rooster.get(characters[0]!.stats);
      }
    }
    return null;
  }

  async getMany(data: IGetStatsDto[]): Promise<IStatsEntity[]> {
    const payload = data.map((e) => new GetStatsDto(e));
    return this.rooster.getMany(payload.map((e) => e.id!));
  }
}
