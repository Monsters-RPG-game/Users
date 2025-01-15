import { afterEach, describe, expect, it } from '@jest/globals';
import mongoose from 'mongoose';
import * as errors from '../../../src/errors/index.js';
import GetController from '../../../src/modules/profile/subModules/get/index.js';
import * as utils from '../../utils/index.js';
import type { IGetProfileDto } from '../../../src/modules/profile/subModules/get/types.js';
import type * as types from '../../../src/types';
import ProfileModel from '../../../src/modules/profile/model.js';
import ProfileRepository from '../../../src/modules/profile/repository/index.js';
import GetProfileDto from '../../../src/modules/profile/subModules/get/dto.js';

describe('Profile', () => {
  const db = new utils.FakeFactory();
  const id = utils.fakeData.users[0]!._id;
   const getProfileDto: IGetProfileDto = {
    id,
  };
  const localUser3: types.IUserBrokerInfo = {
    userId: new mongoose.Types.ObjectId().toString(),
    tempId: 'tempId',
  };
  const profileRepo = new ProfileRepository(ProfileModel)
  const getController = new GetController(profileRepo);

  afterEach(async () => {
    await db.cleanUp();
  });

  describe('Should throw', () => {
    describe('No data passed', () => {
      it('Missing userId', async () => {
         let error: types.IFullError | null = null
        const target = new errors.MissingArgError('id')
        const clone = structuredClone(getProfileDto);
        clone.id = undefined!;

        try {
          await getController.execute(new GetProfileDto(clone))
        } catch (err) {
          error = err as types.IFullError
        }

          expect(error?.message).toEqual(target.message);
          expect(error?.code).toEqual(target.code);
          expect(error?.name).toEqual(target.name);
      });
    });

    describe('Incorrect data', () => {
      it('Incorrect userId', async () => {
         let error: types.IFullError | null = null
        const target = new errors.IncorrectArgTypeError('id should be objectId')
        const clone = structuredClone(getProfileDto);
        clone.id = 'asd';

        try {
          await getController.execute(new GetProfileDto(clone))
        } catch (err) {
          error = err as types.IFullError
        }

          expect(error?.message).toEqual(target.message);
          expect(error?.code).toEqual(target.code);
          expect(error?.name).toEqual(target.name);
      });
    });
  });

  describe('Should pass', () => {
    it('Got profile', async () => {
      await db.profile
        .user(localUser3.userId)
        .create();

      const profile = (await getController.execute(new GetProfileDto({ id: localUser3.userId! })))!;

      expect(profile.user.toString()).toEqual(localUser3.userId);
    });
  });
});
