import { afterEach, describe, expect, it } from '@jest/globals';
import type * as types from '../../../src/types/index.js'
import * as errors from '../../../src/errors/index.js';
import GetController from '../../../src/modules/users/subModules/get/index.js';
import Controller from '../../../src/modules/users/subModules/register/index.js';
import * as utils from '../../utils/index.js';
import type { IGetUserDto } from '../../../src/modules/users/subModules/get/types.js';
import type { IRegisterDto } from '../../../src/modules/users/subModules/register/types.js';
import UserRepository from '../../../src/modules/users/repository/index.js';
import UserModel from '../../../src/modules/users/model.js';
import RegisterUserDto from '../../../src/modules/users/subModules/register/dto.js';
import GetUserDto from '../../../src/modules/users/subModules/get/dto.js';

describe('Register', () => {
  const db = new utils.FakeFactory();
  const registerDto = utils.fakeData.users[3] as IRegisterDto;
  const repo = new UserRepository(UserModel)
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
        const target = new errors.MissingArgError('login')
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

      it('Missing password', async () => {
        let error: types.IFullError | null = null
        const target = new errors.MissingArgError('password')
        const clone = structuredClone(registerDto);
        clone.password = undefined!;

        try {
          await controller.execute(new RegisterUserDto(clone))
        } catch (err) {
          error = err as types.IFullError
        }

          expect(error?.message).toEqual(target.message);
          expect(error?.code).toEqual(target.code);
          expect(error?.name).toEqual(target.name);
      });

      it('Missing email', async () => {
        let error: types.IFullError | null = null
        const target = new errors.MissingArgError('email')
        const clone = structuredClone(registerDto);
        clone.email = undefined!;

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

    describe('Incorrect data', () => {
      it('Already registered', async () => {
        let error: types.IFullError | null = null
        const target = new errors.UsernameAlreadyInUseError()

        await db.user
          .login(registerDto.login)
          .password(registerDto.password)
          .email(registerDto.email)
          .verified(false)
          .create();

        try {
          await controller.execute(new RegisterUserDto(registerDto))
        } catch (err) {
          error = err as types.IFullError
        }

          expect(error?.message).toEqual(target.message);
          expect(error?.code).toEqual(target.code);
          expect(error?.name).toEqual(target.name);
      });

      it('Login incorrect', async () => {
        let error: types.IFullError | null = null
        const target = new errors.IncorrectArgTypeError('login should only contain letters, numbers and special characters')

        try {
          await controller.execute(new RegisterUserDto({
            ...registerDto,
            login: '!@#$%^&*&*()_+P{:"<?a',
            email: 'email@email.email',
          }))
        } catch (err) {
          error = err as types.IFullError
        }

          expect(error?.message).toEqual(target.message);
          expect(error?.code).toEqual(target.code);
          expect(error?.name).toEqual(target.name);
      });

      it('Login too short', async () => {
        let error: types.IFullError | null = null
        const target = new errors.IncorrectArgLengthError('login', 3, 30)

        try {
          await controller.execute(new RegisterUserDto({ ...registerDto, login: 'a' }))
        } catch (err) {
          error = err as types.IFullError
        }

          expect(error?.message).toEqual(target.message);
          expect(error?.code).toEqual(target.code);
          expect(error?.name).toEqual(target.name);
      });

      it('Login too long', async () => {
        let error: types.IFullError | null = null
        const target = new errors.IncorrectArgLengthError('login', 3, 30)

        try {
          await controller.execute(new RegisterUserDto({
            ...registerDto,
            login:
              'asssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
          }))
        } catch (err) {
          error = err as types.IFullError
        }

          expect(error?.message).toEqual(target.message);
          expect(error?.code).toEqual(target.code);
          expect(error?.name).toEqual(target.name);
      });

      it('Password incorrect', async () => {
        let error: types.IFullError | null = null
        const target = new errors.IncorrectArgTypeError(
              'password should contain min. 8 characters with at least 1 digit, 1 letter, 1 upper case letter and 1 lower case letter',
            )

        try {
          await controller.execute(new RegisterUserDto({ ...registerDto, password: 'a@$QEWASD+)}KO_PL{:">?' }))
        } catch (err) {
          error = err as types.IFullError
        }

          expect(error?.message).toEqual(target.message);
          expect(error?.code).toEqual(target.code);
          expect(error?.name).toEqual(target.name);
      });

      it('Password too short', async () => {
        let error: types.IFullError | null = null
        const target = new errors.IncorrectArgLengthError('password', 6, 200)

        try {
          await controller.execute(new RegisterUserDto({ ...registerDto, password: 'a' }))
        } catch (err) {
          error = err as types.IFullError
        }

          expect(error?.message).toEqual(target.message);
          expect(error?.code).toEqual(target.code);
          expect(error?.name).toEqual(target.name);
      });

      it('Password too long', async () => {
        let error: types.IFullError | null = null
        const target = new errors.IncorrectArgLengthError('password', 6, 200)

        try {
          await controller
          .execute(new RegisterUserDto({
            ...registerDto,
            password:
              'aasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsad',
          }))
        } catch (err) {
          error = err as types.IFullError
        }

          expect(error?.message).toEqual(target.message);
          expect(error?.code).toEqual(target.code);
          expect(error?.name).toEqual(target.name);
      });

      it('Email incorrect', async () => {
        let error: types.IFullError | null = null
        const target = new errors.IncorrectArgTypeError('email invalid')

        try {
          await controller.execute(new RegisterUserDto({ ...registerDto, email: 'a' }))
        } catch (err) {
          error = err as types.IFullError
        }

          expect(error?.message).toEqual(target.message);
          expect(error?.code).toEqual(target.code);
          expect(error?.name).toEqual(target.name);
      });

      it('Email incorrect', async () => {
        let error: types.IFullError | null = null
        const target = new errors.IncorrectArgLengthError('email', undefined, 200)

        try {
          await controller
          .execute(new RegisterUserDto({
            ...registerDto,
            email:
              'aasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsadaasdasdasasdassadsad@aa.aa',
          }))
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

      await controller.execute(new RegisterUserDto({ ...registerDto, email: 'test22@test.test' }));
      const [user] = await getController.execute([new GetUserDto(getUserDto)]);
      expect(user?.login).toEqual(getUserDto.name);
    });
  });
});
