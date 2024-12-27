import { afterAll, afterEach, beforeAll, describe, expect, it } from '@jest/globals';
import * as enums from '../../../src/enums/index.js';
import Repository from '../../../src/modules/users/repository/index.js';
import * as utils from '../../utils/index.js';
import type { IRegisterDto } from '../../../src/modules/users/subModules/register/types.js';
import UserModel from '../../../src/modules/users/model.js';

describe('Register', () => {
  const connection = new utils.Connection();
  const db = new utils.FakeFactory();
  const registerData = utils.fakeData.users[0] as IRegisterDto;

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
      const rooster = new Repository(UserModel);
      const user = await rooster.getByEmail(registerData.email);

      expect(user).toEqual(null);
    });

    it('Incorrect target', async () => {
      await db.user
        .login(registerData.login)
        .password(registerData.password)
        .email(registerData.email)
        .verified(false)
        .create();

      const rooster = new Repository(UserModel);
      const user = await rooster.getByLogin('a');

      expect(user).toEqual(null);
    });
  });

  describe('Should pass', () => {
    it('Validated', async () => {
      const rooster = new Repository(UserModel);
      await rooster.add(registerData);
      const user = await rooster.getByLogin(registerData.login);
      const { login, password, email, verified, _id, type } = user!;

      expect(login).toEqual(registerData.login);
      expect(password.length).not.toBeLessThan(registerData.password.length);
      expect(email).toEqual(registerData.email);
      expect(verified).toEqual(false);
      expect(_id).not.toBeUndefined();
      expect(type).toEqual(enums.EUserTypes.User);
    });
  });
});
