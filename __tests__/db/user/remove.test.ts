import { afterAll, afterEach, beforeAll, describe, expect, it } from '@jest/globals';
import * as errors from '../../../src/errors/index.js';
import ProfileRepository from '../../../src/modules/profile/repository/index.js';
import Repository from '../../../src/modules/users/repository/index.js';
import * as utils from '../../utils/index.js';
import type { IProfileEntity } from '../../../src/modules/profile/entity';
import { IUserEntity } from '../../../src/modules/users/entity.js';
import UserModel from '../../../src/modules/users/model.js';
import ProfileModel from '../../../src/modules/profile/model.js';

describe('Remove user', () => {
  const connection = new utils.Connection();
  const db = new utils.FakeFactory();
  const fakeUser = utils.fakeData.users[0] as IUserEntity;
  const fakeUser2 = utils.fakeData.users[1] as IUserEntity;
  const fakeProfile = utils.fakeData.profiles[0] as IProfileEntity;

  beforeAll(async () => {
    await connection.connect();
  });

  afterEach(async () => {
    await db.cleanUp();
  });

  afterAll(async () => {
    await connection.close();
  });

  describe('Should throw', () => {
    it('No data in database', async () => {
      const repository = new Repository(UserModel);
      const user = await repository.get(fakeUser._id);

      expect(user).toEqual(null);
    });

    it('Removing not yours account', async () => {
      await db.user
        ._id(fakeUser._id as string)
        .login(fakeUser.login)
        .password(fakeUser.password)
        .email(fakeUser.email)
        .verified(fakeUser.verified)
        .create();

      await db.profile
        ._id(fakeProfile._id as string)
        .user(fakeProfile.user)
        .create();

      const repository = new Repository(UserModel);
      const profileRepository = new ProfileRepository(ProfileModel);

      const user = await repository.get(fakeUser._id);
      const profile = await profileRepository.get(fakeProfile._id);
      expect(user?._id.toString()).toEqual(fakeUser._id);
      expect(profile?._id.toString()).toEqual(fakeProfile._id);

      try {
        await repository.remove(fakeUser2._id as string);
      } catch (err) {
        expect(err).toEqual(new errors.NoPermission());
      }

      const user2 = await repository.get(fakeUser._id);
      const profile2 = await profileRepository.get(fakeProfile._id);
      expect(user2?._id.toString()).toEqual(fakeUser._id);
      expect(profile2?._id.toString()).toEqual(fakeProfile._id);
    });
  });

  describe('Should pass', () => {
    it('Removed', async () => {
      await db.user
        ._id(fakeUser._id as string)
        .login(fakeUser.login)
        .password(fakeUser.password)
        .email(fakeUser.email)
        .verified(fakeUser.verified)
        .create();
      await db.profile
        ._id(fakeProfile._id as string)
        .user(fakeProfile.user)
        .create();
      const repository = new Repository(UserModel);
      const profileRepository = new ProfileRepository(ProfileModel);

      const user = await repository.get(fakeUser._id);
      const profile = await profileRepository.get(fakeProfile._id);
      expect(user?._id.toString()).toEqual(fakeUser._id);
      expect(profile?._id.toString()).toEqual(fakeProfile._id);

      await repository.remove(fakeUser._id as string);

      const user2 = await repository.get(fakeUser._id);
      expect(user2?._id).toEqual(undefined);
    });
  });
});
