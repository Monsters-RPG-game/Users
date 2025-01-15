import { afterEach, describe, expect, it } from '@jest/globals';
import type * as types from '../../../src/types/index.js'
import * as errors from '../../../src/errors/index.js';
import GetController from '../../../src/modules/users/subModules/get/index.js';
import Controller from '../../../src/modules/users/subModules/remove/index.js';
import * as utils from '../../utils/index.js';
import type { IGetUserDto } from '../../../src/modules/users/subModules/get/types.js';
import UserRepository from '../../../src/modules/users/repository/index.js';
import UserModel from '../../../src/modules/users/model.js';
import GetUserDto from '../../../src/modules/users/subModules/get/dto.js';
import { IRemoveUserDto } from '../../../src/modules/users/subModules/remove/types.js';
import RemoveUserDto from '../../../src/modules/users/subModules/remove/dto.js';
import FakeUser from '../../utils/fakeFactory/src/user.js';

describe('User - remove', () => {
  const db = new utils.FakeFactory();
  const removeDto: IRemoveUserDto = {
    userId: utils.fakeData.users[0]!._id
  }
  const getUserDto: IGetUserDto = {
    id: utils.fakeData.users[0]!._id,
  };
  const repo = new UserRepository(UserModel)
  const controller = new Controller(repo);

  afterEach(async () => {
    await db.cleanUp();
  });

  describe('Should throw', () => {
    describe('No data passed', () => {
      it('Missing id', async () => {
        let error: types.IFullError | null = null
        const target = new errors.MissingArgError('userId')
        const clone = structuredClone(removeDto);
        clone.userId = undefined!;

        try {
          await controller.execute(new RemoveUserDto(clone))
        } catch (err) {
          error = err as types.IFullError
        }

          expect(error?.message).toEqual(target.message);
          expect(error?.code).toEqual(target.code);
          expect(error?.name).toEqual(target.name);
      });
    });

    describe('Incorrect params', () => {
      it('Id is not objectId', async () => {
        let error: types.IFullError | null = null
        const target = new errors.IncorrectArgTypeError('userId should be objectId')
        const clone = structuredClone(removeDto);
        clone.userId = 'asd';

        try {
          await controller.execute(new RemoveUserDto(clone))
        } catch (err) {
          error = err as types.IFullError
        }

          expect(error?.message).toEqual(target.message);
          expect(error?.code).toEqual(target.code);
          expect(error?.name).toEqual(target.name);
      });
    })
  });

  describe('Should pass', () => {
    it('Validated', async () => {
      new FakeUser()._id(removeDto.userId).login(utils.fakeData.users[0]!.login).oidcId(utils.fakeData.users[0]!.oidcId).create()
      const getController = new GetController(repo);

      await controller.execute(new RemoveUserDto(removeDto));
      const [user] = await getController.execute([new GetUserDto(getUserDto)]);

      expect(user?.login).toBeUndefined();
    });
  });
});
