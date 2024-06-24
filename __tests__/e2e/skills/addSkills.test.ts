import { beforeEach, afterEach, describe, expect, it } from '@jest/globals';
import mongoose from 'mongoose';
import * as enums from '../../../src/enums';
import * as errors from '../../../src/errors';
import GetProfileController from '../../../src/modules/profile/get';
import AddSkillsController from '../../../src/modules/skills/add';
import GetSkillsController from '../../../src/modules/skills/get';
import * as utils from '../../utils';
import { fakeData } from '../../utils';
import type { IInventoryEntity } from '../../../src/modules/inventory/entity';
import type { IPartyEntity } from '../../../src/modules/party/entity';
import type { IProfileEntity } from '../../../src/modules/profile/entity';
import type { ISingleSkillEntity } from '../../../src/modules/singleSkill/entity';
import type { IAddSkillsDto } from '../../../src/modules/skills/add/types';
import type { ISkillsEntity } from '../../../src/modules/skills/entity';
import type { IStatsEntity } from '../../../src/modules/stats/entity';
import type * as types from '../../../src/types';

describe('Profile', () => {
  const db = new utils.FakeFactory();
  const fake = fakeData.profiles[0] as IProfileEntity;
  const fakeInv = fakeData.inventories[0] as IInventoryEntity;
  const fakeParty = fakeData.parties[0] as IPartyEntity;
  const fakeStats = fakeData.stats[0] as IStatsEntity;
  const fakeSkills = utils.fakeData.skills[0] as ISkillsEntity;
  const fakeSingleSkill = utils.fakeData.singleSkill[0] as ISingleSkillEntity;

  const localUser: types.ILocalUser = {
    userId: fake.user,
    tempId: 'tempId',
    validated: true,
    type: enums.EUserTypes.User,
  };

  const payload: IAddSkillsDto = {
    // owner: localUser.userId!,
    owner: fake.user,
    singleSkillId: fakeSingleSkill._id,
  };

  const addSkillsController = new AddSkillsController();
  const getProfileController = new GetProfileController();
  const getSkillsController = new GetSkillsController();

  afterEach(async () => {
    await db.cleanUp();
  });

  describe('Should throw', () => {
    describe('no data passed', () => {
      beforeEach(async () => {
        await db.profile
          .user(localUser.userId)
          .race(fake.race)
          .lvl(fake.lvl)
          .exp(fake.exp)
          .friends(fake.friends)
          ._id(fake._id)
          .inventory(fakeInv._id)
          .party(fakeParty._id)
          .skills(fakeSkills._id)
          .stats(fakeStats._id)
          .create();

        await db.skills._id(fakeSkills._id).owner(localUser.userId).singleSkills().create();

        await db.singleSkill
          ._id(fakeSingleSkill._id)
          .power(fakeSingleSkill.power)
          .type(fakeSingleSkill.type)
          .target(fakeSingleSkill.target)
          .name(fakeSingleSkill.name)
          .create();
      });

      it('missing owner', async () => {
        const clone = structuredClone(payload);
        clone.owner = undefined!;
        await addSkillsController.add(clone).catch((err) => {
          expect(err).toEqual(new errors.MissingArgError('owner'));
        });
      });

      it('missing singleSkillId', async () => {
        const clone = structuredClone(payload);
        clone.singleSkillId = undefined!;
        await addSkillsController.add(clone).catch((err) => {
          expect(err).toEqual(new errors.MissingArgError('singleSkillId'));
        });
      });
    });

    describe('incorrect data passed', () => {
      beforeEach(async () => {
        await db.profile
          .user(localUser.userId)
          .race(fake.race)
          .lvl(fake.lvl)
          .exp(fake.exp)
          .friends(fake.friends)
          ._id(fake._id)
          .inventory(fakeInv._id)
          .party(fakeParty._id)
          .skills(fakeSkills._id)
          .stats(fakeStats._id)
          .create();
      });

      it('incorrect owner', async () => {
        const clone = structuredClone(payload);
        clone.owner = 2 as unknown as string;
        await addSkillsController.add(clone).catch((err) => {
          expect(err).toEqual(new errors.IncorrectArgTypeError('owner should be a string'));
        });
      });

      it('incorrect singleSkillId', async () => {
        const clone = structuredClone(payload);
        clone.singleSkillId = 2 as unknown as string;
        await addSkillsController.add(clone).catch((err) => {
          expect(err).toEqual(new errors.IncorrectArgTypeError('singleSkillId should be a string'));
        });
      });

      it('profile does not exist', async () => {
        const clone = structuredClone(payload);
        clone.owner = new mongoose.Types.ObjectId().toString();
        try {
          await addSkillsController.add(clone);
        } catch (error) {
          expect(error).toEqual(new errors.ProfileDoesNotExists());
        }
      });

      it('singleSkill does not exist', async () => {
        const clone = structuredClone(payload);
        clone.owner = localUser.userId!;
        clone.singleSkillId = '63e55edbe8a800060941121e';
        try {
          await addSkillsController.add(clone);
        } catch (error) {
          expect(error).toEqual(new errors.SingleSkillDoesNotExist());
        }
      });
    });
  });

  describe('Should pass', () => {
    it('added skills', async () => {
      await db.profile
        .user(localUser.userId)
        .race(fake.race)
        .lvl(fake.lvl)
        .exp(fake.exp)
        .friends(fake.friends)
        ._id(fake._id)
        .inventory(fakeInv._id)
        .party(fakeParty._id)
        .skills(fakeSkills._id)
        .stats(fakeStats._id)
        .create();
      await db.skills._id(fakeSkills._id).owner(localUser.userId).singleSkills().create();

      await db.singleSkill
        ._id(fakeSingleSkill._id)
        .power(fakeSingleSkill.power)
        .type(fakeSingleSkill.type)
        .target(fakeSingleSkill.target)
        .name(fakeSingleSkill.name)
        .create();

      await addSkillsController.add(payload);

      const profile = (await getProfileController.getById({ id: fake._id }))!;
      const skills = await getSkillsController.get({ id: profile.skills.toString() });
      expect(skills?.singleSkills[0]?.skillId.toString()).toEqual(payload.singleSkillId.toString());
    });
  });
});
