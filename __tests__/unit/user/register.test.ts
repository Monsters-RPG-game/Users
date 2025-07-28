import { describe, expect, it } from '@jest/globals';
import type { IFullError } from '../../../src/types/index.js'
import RegisterDto from '../../../src/modules/users/subModules/register/dto.js';
import { generateRandomName } from '../../utils/index.js';
import type { IRegisterDto } from '../../../src/modules/users/subModules/register/types.js';
import mongoose from 'mongoose';
import { IncorrectArgTypeError, MissingArgError } from '@monsters/validator';

describe('User - register', () => {
  const register: IRegisterDto = {
    login: generateRandomName(),
    oidcId: new mongoose.Types.ObjectId().toString()
  };

  describe('Should throw', () => {
    describe('No data passed', () => {
      Object.keys(register).forEach((k) => {
        return it(`Missing ${k}`, () => {
          let error: IFullError | undefined = undefined
          const target = new MissingArgError(k)
          const clone = structuredClone(register);
          delete clone[k as keyof typeof clone];

          try {
            new RegisterDto(clone);
          } catch (err) {
            error = err as IFullError
          }

          expect(error!.message).toEqual(target.message);
          expect(error!.code).toEqual(target.code);
        });
      });
    });

    describe('Incorrect params', () => {
      it(`Incorrect login`, () => {
        const target = new IncorrectArgTypeError('login should be a string')
        let error: IFullError | undefined = undefined
        const clone = structuredClone(register);
        clone.login = 123 as unknown as string

        try {
          new RegisterDto(clone);
        } catch (err) {
          error = err as IFullError
        }

          expect(error!.message).toEqual(target.message);
          expect(error!.code).toEqual(target.code);
      });

      it(`Incorrect oidcId`, () => {
        const target = new IncorrectArgTypeError('oidcId should be a string')
        let error: IFullError | undefined = undefined
        const clone = structuredClone(register);
        clone.oidcId = 123 as unknown as string

        try {
          new RegisterDto(clone);
        } catch (err) {
          error = err as IFullError
        }

          expect(error!.message).toEqual(target.message);
          expect(error!.code).toEqual(target.code);
      });

      it(`OidcId is too short`, () => {
        const target = new IncorrectArgTypeError('oidcId should be objectId')
        let error: IFullError | undefined = undefined
        const clone = structuredClone(register);
        clone.oidcId = '1'

        try {
          new RegisterDto(clone);
        } catch (err) {
          error = err as IFullError
        }

          expect(error!.message).toEqual(target.message);
          expect(error!.code).toEqual(target.code);
      });
    });
  });

  describe('Should pass', () => {
    it('Validated register', () => {
      try {
        const data = new RegisterDto(register);
        expect(data.oidcId).toEqual(register.oidcId);
      } catch (err) {
        expect(err).toBeUndefined();
      }
    });
  });
});
