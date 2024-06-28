import mongoose from 'mongoose';
import Skills from './model';
import RoosterFactory from '../../tools/abstract/rooster';
import type { ISkills, ISkillsEntityDetailed } from './types';
import type { EModules } from '../../tools/abstract/enums';

export default class Rooster extends RoosterFactory<ISkills, typeof Skills, EModules.Skills> {
  constructor() {
    super(Skills);
  }

  async getDetailed(id: string): Promise<ISkillsEntityDetailed | null> {
    const data = await this.model.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $unwind: {
          path: '$singleSkills',
        },
      },
      {
        $lookup: {
          from: 'singleskills',
          localField: 'singleSkills.skillId',
          foreignField: '_id',
          as: 'skillsDetail',
        },
      },
      {
        $unwind: {
          path: '$skillsDetail',
        },
      },
      {
        $group: {
          _id: '$_id',
          owner: {
            $first: '$owner',
          },
          singleSkills: {
            $push: '$skillsDetail',
          },
        },
      },
    ]);
    return !data || data.length === 0 ? null : (data[0] as ISkillsEntityDetailed);
  }
}
