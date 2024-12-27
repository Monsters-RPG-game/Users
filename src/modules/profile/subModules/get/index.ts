import type GetProfileDto from './dto.js';
import type { IAbstractSubController } from '../../../../types/index.js';
import type { IProfileEntity } from '../../entity.js';
import type ProfileRepository from '../../repository/index.js';

export default class GetProfileController implements IAbstractSubController<IProfileEntity | null> {
  constructor(repo: ProfileRepository) {
    this.repo = repo;
  }

  async getById(data: GetProfileDto): Promise<IProfileEntity | null> {
    return this.repo.get(data.id);
  }

  private accessor repo: ProfileRepository;

  async execute(data: GetProfileDto): Promise<IProfileEntity | null> {
    return this.repo.getByUser(data.id);
  }
}
