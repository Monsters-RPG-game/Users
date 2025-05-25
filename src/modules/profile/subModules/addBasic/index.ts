import type AddBasicProfileDto from './dto.js';
import type { IAbstractSubController } from '../../../../types/index.js';
import type { IProfileRepository } from '../../repository/types.js';

export default class AddBasicProfileController implements IAbstractSubController<string> {
  constructor(repo: IProfileRepository) {
    this.repo = repo;
  }

  private accessor repo: IProfileRepository;

  async execute(data: AddBasicProfileDto): Promise<string> {
    return this.repo.addDefault(data);
  }
}
