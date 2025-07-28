import { afterEach, describe, expect, it } from '@jest/globals';
import type * as types from '../../../src/types/index.js'
import GetController from '../../../src/modules/users/subModules/get/index.js';
import Controller from '../../../src/modules/users/subModules/register/index.js';
import * as utils from '../../utils/index.js';
import type { IGetUserDto } from '../../../src/modules/users/subModules/get/types.js';
import type { IRegisterDto } from '../../../src/modules/users/subModules/register/types.js';
import UserRepository from '../../../src/modules/users/repository/index.js';
import RegisterUserDto from '../../../src/modules/users/subModules/register/dto.js';
import GetUserDto from '../../../src/modules/users/subModules/get/dto.js';
import { MissingArgError } from '@monsters/validator';

describe('User - register', () => {
  const db = new utils.FakeFactory();
  const registerDto = utils.fakeData.users[3] as IRegisterDto;
  const repo = UserRepository.createInstance()
  const controller = new Controller(repo);
  const getUserDto: IGetUserDto = {
    name: registerDto.login,
  };

  afterEach(async () => {
    await db.cleanUp();
  });

  describe('Should throw', () => {
    describe('No data passed', () => {
      it('Missing login', async () => {
        let error: types.IFullError | null = null
        const target = new MissingArgError('login')
        const clone = structuredClone(registerDto);
        clone.login = undefined!;

        try {
          await controller.execute(new RegisterUserDto(clone))
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
    it('Validated', async () => {
      const getController = new GetController(repo);

      await controller.execute(new RegisterUserDto({ ...registerDto }));
      const [user] = await getController.execute([new GetUserDto(getUserDto)]);
      expect(user?.login).toEqual(getUserDto.name);
    });
  });
});
