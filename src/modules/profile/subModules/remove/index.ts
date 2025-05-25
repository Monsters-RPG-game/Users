import { UserDoesNotExist } from '../../../../errors/index.js';
import type RemoveProfileDto from './dto.js';
import type { IAbstractSubController } from '../../../../types/index.js';
import type { IProfileRepository } from '../../repository/types.js';

export default class RemoveProfileController implements IAbstractSubController<void> {
  constructor(repo: IProfileRepository) {
    this.repo = repo;
  }

  private accessor repo: IProfileRepository;

  async execute(data: RemoveProfileDto): Promise<void> {
    const exist = await this.repo.getByUser(data.id);
    if (!exist) throw new UserDoesNotExist();
    await this.repo.remove(exist._id.toString());
  }
}
