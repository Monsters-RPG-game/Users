import { afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals';
import State from '../../../src/tools/state.js'
import type * as types from '../../../src/types/index.js'
import * as errors from '../../../src/errors/index.js';
import * as services from '../../../src/connections/broker/services/index.js';
import * as utils from '../../utils/index.js';
import type { IProfileEntity } from '../../../src/modules/profile/entity.js';
import { IUserEntity } from '../../../src/modules/users/entity.js';
import { IRemoveUserDto } from '../../../src/modules/users/subModules/remove/types.js';
import { IUserBrokerInfo } from '../../../src/types/user.js';
import { EControllers } from '../../../src/enums/controllers.js';
import UserController from '../../../src/modules/users/controller.js';
import Bootstrap from '../../../src/tools/bootstrap.js';
import ProfileController from '../../../src/modules/profile/controller.js';
import sleep from '../../../src/utils/index.js';

describe('Remove user', () => {
  const db = new utils.FakeFactory();
  const fakeUser = utils.fakeData.users[0] as IUserEntity;
  const fakeUser2 = utils.fakeData.users[1] as IUserEntity;
  const fakeProfile = utils.fakeData.profiles[0] as IProfileEntity;
  const localUser: IUserBrokerInfo = {
    userId: fakeUser._id as string,
    tempId: 'tempId',
    validated: true,
    type: fakeUser.type,
  };
  const localUser2: IUserBrokerInfo = {
    userId: fakeUser2._id as string,
    tempId: 'tempId',
    validated: true,
    type: fakeUser2.type,
  };
  const removeUserDto: IRemoveUserDto = {
    password: fakeUser.password,
  };

  const removeAction = new services.SharedServices()

  afterEach(async () => {
    await db.cleanUp();
  });

  beforeAll(() => {
    const bootstrap = new Bootstrap()
    State.controllers = bootstrap
    State.controllers.register(EControllers.Users, new UserController())
    State.controllers.register(EControllers.Profile, new ProfileController())
  })

  describe('Should throw', () => {
    describe('Incorrect data', () => {
      beforeEach(async () => {
        await sleep(300);
        await db.user
          ._id(fakeUser._id as string)
          .login(fakeUser.login)
          .password(fakeUser.password)
          .email(fakeUser.email)
          .verified(fakeUser.verified)
          .create();
      });

      afterEach(async () => {
        await db.cleanUp();
      });

      it('No user with provided id', async () => {
        let error: types.IFullError | null = null
        const target = new errors.MissingArgError('password')
        const clone = structuredClone(removeUserDto)
        clone.password  = undefined as unknown as string

        try {
          await removeAction.removeUser(fakeUser2.login, localUser2)
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
    it('Removed', async () => {
      let error: types.IFullError | null = null
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

      try {
        await removeAction.removeUser(removeUserDto, localUser);
      } catch (err) {
        console.log("err ?", err)
        error = err as types.IFullError
      }

      expect(error).toBeNull();
    });
  });
});
