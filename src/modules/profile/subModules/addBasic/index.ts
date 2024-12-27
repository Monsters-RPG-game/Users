import type AddBasicProfileDto from './dto.js';
import type { IAbstractSubController } from '../../../../types/index.js';
import type ProfileRepository from '../../repository/index.js';

export default class AddBasicProfileController implements IAbstractSubController<string> {
  constructor(repo: ProfileRepository) {
    this.repo = repo;
  }

  private accessor repo: ProfileRepository;

  async execute(data: AddBasicProfileDto): Promise<string> {
    return this.repo.addDefault(data);
  }
}
