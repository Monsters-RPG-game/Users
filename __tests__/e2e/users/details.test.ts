import { afterEach, describe, expect, it } from '@jest/globals';
import type * as types from '../../../src/types/index.js'
import * as errors from '../../../src/errors/index.js';
import Controller from '../../../src/modules/users/subModules/get/index.js';
import * as utils from '../../utils/index.js';
import type { IUserEntity } from '../../../src/modules/users/entity.js';
import type { IGetUserDto } from '../../../src/modules/users/subModules/get/types.js';
import UserRepository from '../../../src/modules/users/repository/index.js';
import UserModel from '../../../src/modules/users/model.js';
import GetUserDto from '../../../src/modules/users/subModules/get/dto.js';

describe('User - get details', () => {
  const db = new utils.FakeFactory();
  const fakeUser = utils.fakeData.users[0] as IUserEntity;
  const getUserDto: IGetUserDto = {
    id: fakeUser._id as string,
    name: fakeUser.login,
  };
  const userRepo = new UserRepository(UserModel)
  const controller = new Controller(userRepo);

  afterEach(async () => {
    await db.cleanUp();
  });

  describe('Should throw', () => {
    describe('Missing data', () => {
      it('Missing data', async () => {
        let error: types.IFullError | null = null
        const target = new errors.MissingArgError('name')
        const clone = structuredClone(getUserDto);
        delete clone.name;
        delete clone.id;

        try {
          await controller.execute([new GetUserDto(clone)])
        } catch (err) {
          error = err as types.IFullError
        }

        expect(error?.message).toEqual(target.message);
        expect(error?.code).toEqual(target.code);
        expect(error?.name).toEqual(target.name)
      });
    });

    describe('Incorrect data', () => {
      it('Id not proper id', async () => {
        let error: types.IFullError | null = null
        const target = new errors.IncorrectArgTypeError('id should be objectId')
        const clone = structuredClone(getUserDto);
        clone.id = 'aa';

        try {
          await controller.execute([new GetUserDto(clone)])
        } catch (err) {
          error = err as types.IFullError
        }

          expect(error?.message).toEqual(target.message);
          expect(error?.code).toEqual(target.code);
          expect(error?.name).toEqual(target.name);
      });

      it('Name is not typeof string', async () => {
        let error: types.IFullError | null = null
        const target = new errors.IncorrectArgTypeError('name should be a string')
        const clone = structuredClone(getUserDto);
        clone.name = 2 as unknown as string;

        try {
          await controller.execute([new GetUserDto(clone)])
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
    it('Should pass', async () => {
      await db.user
        ._id(fakeUser._id as string)
        .login(fakeUser.login)
        .oidcId(fakeUser.oidcId)
        .create();

      const [user] = await controller.execute([new GetUserDto(getUserDto)]);
      expect(user?.login).toEqual(fakeUser.login);
    });

      it('User with provided id does not exist', async () => {
        const clone = structuredClone(getUserDto);
        clone.name = 'a';

        const user = await controller.execute([new GetUserDto(clone)])

        expect(user).toEqual([]);
      });
  });
});
