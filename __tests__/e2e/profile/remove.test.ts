import { afterEach, describe, expect, it } from '@jest/globals';
import mongoose from 'mongoose';
import * as errors from '../../../src/errors/index.js';
import RemoveController from '../../../src/modules/profile/subModules/remove/index.js';
import * as utils from '../../utils/index.js';
import type { IRemoveProfileDto } from '../../../src/modules/profile/subModules/remove/types.js';
import type * as types from '../../../src/types';
import ProfileModel from '../../../src/modules/profile/model.js';
import ProfileRepository from '../../../src/modules/profile/repository/index.js';
import RemoveProfileDto from '../../../src/modules/profile/subModules/remove/dto.js';

describe('Profile - remove', () => {
  const db = new utils.FakeFactory();
  const id = utils.fakeData.users[0]!._id;
   const removeProfileDto: IRemoveProfileDto = {
    id,
  };
  const localUser3: types.IUserBrokerInfo = {
    userId: new mongoose.Types.ObjectId().toString(),
    tempId: 'tempId',
  };
  const profileRepo = new ProfileRepository(ProfileModel)
  const removeController = new RemoveController(profileRepo);

  afterEach(async () => {
    await db.cleanUp();
  });

  describe('Should throw', () => {
    describe('No data passed', () => {
      it('Missing userId', async () => {
         let error: types.IFullError | null = null
        const target = new errors.MissingArgError('id')
        const clone = structuredClone(removeProfileDto);
        clone.id = undefined!;

        try {
          await removeController.execute(new RemoveProfileDto(clone))
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
        const clone = structuredClone(removeProfileDto);
        clone.id = 'asd';

        try {
          await removeController.execute(new RemoveProfileDto(clone))
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
    it('Remove profile', async () => {
      await db.profile
        .user(localUser3.userId)
        .create();

      let error: types.IFullError | undefined = undefined

      try {
        await removeController.execute(new RemoveProfileDto({ id: localUser3.userId as string }));
      } catch (err) {
        error = err as types.IFullError
      }

      expect(error).toBeUndefined()
    });
  });
});
