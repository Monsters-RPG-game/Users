import { describe, expect, it } from '@jest/globals';
import * as errors from '../../../src/errors/index.js';
import * as utils from '../../utils/index.js';
import type { ILoginDto } from '../../../src/modules/users/subModules/login/types.js';
import type { IRegisterDto } from '../../../src/modules/users/subModules/register/types.js';
import LoginDto from '../../../src/modules/users/subModules/login/dto.js'

describe('Login', () => {
  const fakeUser = utils.fakeData.users[0] as IRegisterDto;
  const loginDto: ILoginDto = {
    login: 'Test',
    password: 'Test123',
    ip: '127.0.0.1',
  };

  describe('Should throw', () => {
    describe('No data passed', () => {
      Object.keys(loginDto).forEach((k) => {
        return it(`Missing ${k}`, () => {
          const clone = structuredClone(loginDto);
          delete clone[k as keyof typeof clone];

          try {
            new LoginDto(clone);
          } catch (err) {
            expect(err).toEqual(new errors.MissingArgError(k));
          }
        });
      });
    });

    describe('Incorrect data', () => {
      it('Login too short', () => {
        const clone = structuredClone(fakeUser);
        clone.login = 'bc';
        try {
          new LoginDto({ ...clone, ip: loginDto.ip });
        } catch (err) {
          expect(err).toEqual(new errors.IncorrectArgLengthError('login', 3, 30));
        }
      });

      it('Login too long', () => {
        const clone = structuredClone(fakeUser);
        clone.login =
          'asssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss';
        try {
          new LoginDto({ ...clone, ip: loginDto.ip });
        } catch (err) {
          expect(err).toEqual(new errors.IncorrectArgLengthError('login', 3, 30));
        }
      });

      it('Incorrect password', () => {
        const clone = structuredClone(fakeUser);
        clone.password = 'abc';
        try {
          new LoginDto({ ...clone, ip: loginDto.ip });
        } catch (err) {
          expect(err).toEqual(new errors.IncorrectArgLengthError('password', 6, 200));
        }
      });
    });
  });

  describe('Should pass', () => {
    it('Validated login', () => {
      try {
        const data = new LoginDto(loginDto);
        expect(data.password).toEqual(loginDto.password);
      } catch (err) {
        expect(err).toBeUndefined();
      }
    });
  });
});
