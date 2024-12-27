import { afterAll, afterEach, beforeAll, describe, expect, it } from '@jest/globals';
import mongoose from 'mongoose';
import Repository from '../../../src/modules/profile/repository/index.js';
import * as utils from '../../utils/index.js';
import FakeFactory from '../../utils/fakeFactory/src/index.js';
import type { IRegisterDto } from '../../../src/modules/users/subModules/register/types.js';
import ProfileModel from '../../../src/modules/profile/model.js';

describe('Profile', () => {
  const connection = new utils.Connection();
  const db = new FakeFactory();
  const loginData = utils.fakeData.users[0] as IRegisterDto;

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
      const repository = new Repository(ProfileModel);
      const profile = await repository.get(new mongoose.Types.ObjectId().toString());

      expect(profile).toEqual(null);
    });

    it('Incorrect target', async () => {
      const userId = await db.user
        .login(loginData.login)
        .password(loginData.password)
        .email(loginData.email)
        .verified(false)
        .create();

      await db.profile
        .user(userId.toString())
        .create();

      const repository = new Repository(ProfileModel);
      const profile = await repository.get(new mongoose.Types.ObjectId().toString());
      expect(profile).toEqual(null);
    });
  });

  describe('Should pass', () => {
    it('Validated', async () => {
      const userId = await db.user
        .login(loginData.login)
        .password(loginData.password)
        .email(loginData.email)
        .verified(false)
        .create();
      await db.profile
        .user(userId.toString())
        .create();

      const repository = new Repository(ProfileModel);
      const profile = await repository.getByUser(userId.toString());
      const { user } = profile!;

      expect(user).toEqual(userId);
    });
  });
});
