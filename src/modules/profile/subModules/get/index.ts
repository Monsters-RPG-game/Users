import GetProfileEntity from './entity.js';
import type GetProfileDto from './dto.js';
import type { IAbstractSubController } from '../../../../types/index.js';
import type { IProfileEntity } from '../../entity.js';
import type { IProfileRepository } from '../../repository/types.js';

export default class GetProfileController implements IAbstractSubController<IProfileEntity | null> {
  constructor(repo: IProfileRepository) {
    this.repo = repo;
  }

  private accessor repo: IProfileRepository;

  async getById(data: GetProfileDto): Promise<IProfileEntity | null> {
    return this.repo.get(data.id);
  }

  async execute(data: GetProfileDto): Promise<IProfileEntity | null> {
    const response = await this.repo.getByUser(data.id);
    return response ? new GetProfileEntity(response) : null;
  }
}
