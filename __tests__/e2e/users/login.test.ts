import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import type * as types from '../../../src/types/index.js'
import * as errors from '../../../src/errors/index.js';
import Controller from '../../../src/modules/users/subModules/login/index.js';
import * as utils from '../../utils/index.js';
import type { ILoginDto } from '../../../src/modules/users/subModules/login/types.js';
import UserRepository from '../../../src/modules/users/repository/index.js';
import UserModel from '../../../src/modules/users/model.js';
import LoginDto from '../../../src/modules/users/subModules/login/dto.js';

describe('Login', () => {
  const db = new utils.FakeFactory();
  const loginDto = { ...utils.fakeData.users[0], ip: '127.0.0.1' } as ILoginDto;
  const repo = new UserRepository(UserModel)
  const controller = new Controller(repo);

  afterEach(async () => {
    await db.cleanUp();
  });

  describe('Should throw', () => {
    describe('No data passed', () => {
      it('Missing login', async () => {
        let error: types.IFullError | null = null
        const target = new errors.MissingArgError('login')
        const clone = structuredClone(loginDto);
        clone.login = undefined!;

        try {
          await controller.execute(new LoginDto(clone))
        } catch (err) {
          error = err as types.IFullError
        }

        expect(error?.message).toEqual(target.message);
        expect(error?.code).toEqual(target.code);
        expect(error?.name).toEqual(target.name)
     });

      it('Missing password', async () => {
        let error: types.IFullError | null = null
        const target = new errors.MissingArgError('password')
        const clone = structuredClone(loginDto);
        clone.password = undefined!;

        try {
          await controller.execute(new LoginDto(clone))
        } catch (err) {
          error = err as types.IFullError
        }

        expect(error?.message).toEqual(target.message);
        expect(error?.code).toEqual(target.code);
        expect(error?.name).toEqual(target.name)
      });
    });

    describe('Incorrect data', () => {
      beforeEach(async () => {
        await db.user
          .login(loginDto.login)
          .password(loginDto.password)
          .email('test@test.test')
          .verified(false)
          .create();
      });

      afterEach(async () => {
        await db.cleanUp();
      });

      it('Login incorrect', async () => {
        let error: types.IFullError | null = null
        const target = new errors.IncorrectArgLengthError('login', 3, 30)
        const clone = structuredClone(loginDto);
        clone.password = undefined!;

        try {
          await controller.execute(new LoginDto({ ...loginDto, login: 'a' }))
        } catch (err) {
          error = err as types.IFullError
        }

        expect(error?.message).toEqual(target.message);
        expect(error?.code).toEqual(target.code);
        expect(error?.name).toEqual(target.name)
      });

      it('Password incorrect', async () => {
        let error: types.IFullError | null = null
        const target = new errors.IncorrectArgLengthError('password', 6, 200)
        const clone = structuredClone(loginDto);
        clone.password = undefined!;

        try {
          await controller.execute(new LoginDto({ ...loginDto, password: 'a' }))
        } catch (err) {
          error = err as types.IFullError
        }

        expect(error?.message).toEqual(target.message);
        expect(error?.code).toEqual(target.code);
        expect(error?.name).toEqual(target.name)
      });
    });
  });

  describe('Should pass', () => {
    it('Validated', async () => {
      await db.user
        .login(loginDto.login)
        .password(loginDto.password)
        .email('test@test.test')
        .verified(false)
        .create();

      const id = await controller.execute(new LoginDto(loginDto));
      expect(id).not.toBeUndefined();
      expect(id.length).not.toBeLessThan(10);
    });
  });
});
