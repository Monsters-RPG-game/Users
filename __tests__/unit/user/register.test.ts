import { describe, expect, it } from '@jest/globals';
import * as errors from '../../../src/errors/index.js';
import RegisterDto from '../../../src/modules/users/subModules/register/dto.js';
import { generateRandomName } from '../../utils/index.js';
import type { IRegisterDto } from '../../../src/modules/users/subModules/register/types.js';
import mongoose from 'mongoose';

describe('Login', () => {
  const register: IRegisterDto = {
    login: generateRandomName(),
    oidcId: new mongoose.Types.ObjectId().toString()
  };

  describe('Should throw', () => {
    describe('No data passed', () => {
      Object.keys(register).forEach((k) => {
        return it(`Missing ${k}`, () => {
          const clone = structuredClone(register);
          delete clone[k as keyof typeof clone];

          try {
            new RegisterDto(clone);
          } catch (err) {
            expect(err).toEqual(new errors.MissingArgError(k));
          }
        });
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
