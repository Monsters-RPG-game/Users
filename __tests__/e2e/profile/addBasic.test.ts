import { afterEach, describe, expect, it } from '@jest/globals';
import * as errors from '../../../src/errors/index.js';
import AddController from '../../../src/modules/profile/subModules/addBasic/index.js';
import * as utils from '../../utils/index.js';
import type { IAddBasicProfileDto } from '../../../src/modules/profile/subModules/addBasic/types.js';
import type * as types from '../../../src/types';
import ProfileModel from '../../../src/modules/profile/model.js';
import ProfileRepository from '../../../src/modules/profile/repository/index.js';
import AddBasicProfileDto from '../../../src/modules/profile/subModules/addBasic/dto.js';
import FakeData from '../../utils/fakeData.json';

describe('Profile - add basic', () => {
  const db = new utils.FakeFactory();
   const addProfileDto: IAddBasicProfileDto = {
    user: FakeData.users[0]!._id,
  };
  const profileRepo = new ProfileRepository(ProfileModel)
  const addController = new AddController(profileRepo);

  afterEach(async () => {
    await db.cleanUp();
  });

  describe('Should throw', () => {
    describe('No data passed', () => {
      it('Missing user', async () => {
         let error: types.IFullError | null = null
        const target = new errors.MissingArgError('user')
        const clone = structuredClone(addProfileDto);
        clone.user = undefined!;

        try {
          await addController.execute(new AddBasicProfileDto(clone))
        } catch (err) {
          error = err as types.IFullError
        }

          expect(error?.message).toEqual(target.message);
          expect(error?.code).toEqual(target.code);
          expect(error?.name).toEqual(target.name);
      });
    });

    describe('Incorrect data', () => {
      it('Incorrect login', async () => {
         let error: types.IFullError | null = null
        const target = new errors.IncorrectArgTypeError('user should be a string')
        const clone = structuredClone(addProfileDto);
        clone.user = 123 as unknown as string;

        try {
          await addController.execute(new AddBasicProfileDto(clone))
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
      const profile = (await addController.execute(new AddBasicProfileDto(addProfileDto)))!;

      expect(profile).not.toBeUndefined();
    });
  });
});
