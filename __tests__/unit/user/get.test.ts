import { describe, expect, it } from '@jest/globals';
import type { IFullError } from '../../../src/types/index.js'
import * as errors from '../../../src/errors/index.js';
import GetUserDto from '../../../src/modules/users/subModules/get/dto.js';
import { generateRandomName } from '../../utils/index.js';
import type { IGetUserDto } from '../../../src/modules/users/subModules/get/types.js';
import mongoose from 'mongoose';

describe('User - get', () => {
  const register: IGetUserDto = {
    name: generateRandomName(),
    id: new mongoose.Types.ObjectId().toString(),
    oidcId: new mongoose.Types.ObjectId().toString()
  };

  describe('Should throw', () => {
    describe('No data passed', () => {
         it(`No data provided`, () => {
          let error: IFullError | undefined = undefined
          const target = new errors.MissingArgError('name')
          const clone = structuredClone(register);
          delete clone.name;
          delete clone.id
          delete clone.oidcId

          try {
            new GetUserDto(clone);
          } catch (err) {
            error = err as IFullError
          }

        expect(error!.message).toEqual(target.message);
        expect(error!.code).toEqual(target.code);
      });
    });

    describe('Incorrect params', () => {
      it(`Incorrect name`, () => {
        const target = new errors.IncorrectArgTypeError('name should be a string')
        let error: IFullError | undefined = undefined
        const clone = structuredClone(register);
        clone.name = 123 as unknown as string

        try {
          new GetUserDto(clone);
        } catch (err) {
          error = err as IFullError
        }

          expect(error!.message).toEqual(target.message);
          expect(error!.code).toEqual(target.code);
      });

      it(`Incorrect oidcId`, () => {
        const target = new errors.IncorrectArgTypeError('oidcId should be a string')
        let error: IFullError | undefined = undefined
        const clone = structuredClone(register);
        clone.oidcId = 123 as unknown as string

        try {
          new GetUserDto(clone);
        } catch (err) {
          error = err as IFullError
        }

          expect(error!.message).toEqual(target.message);
          expect(error!.code).toEqual(target.code);
      });

      it(`Incorrect id`, () => {
        const target = new errors.IncorrectArgTypeError('id should be a string')
        let error: IFullError | undefined = undefined
        const clone = structuredClone(register);
        clone.id = 123 as unknown as string

        try {
          new GetUserDto(clone);
        } catch (err) {
          error = err as IFullError
        }

          expect(error!.message).toEqual(target.message);
          expect(error!.code).toEqual(target.code);
      });

      it(`OidcId is too short`, () => {
        const target = new errors.IncorrectArgTypeError('oidcId should be objectId')
        let error: IFullError | undefined = undefined
        const clone = structuredClone(register);
        clone.oidcId = '1'

        try {
          new GetUserDto(clone);
        } catch (err) {
          error = err as IFullError
        }

          expect(error!.message).toEqual(target.message);
          expect(error!.code).toEqual(target.code);
      });

      it(`Id is too short`, () => {
        const target = new errors.IncorrectArgTypeError('id should be objectId')
        let error: IFullError | undefined = undefined
        const clone = structuredClone(register);
        clone.id = '1'

        try {
          new GetUserDto(clone);
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
        const data = new GetUserDto(register);
        expect(data.oidcId).toEqual(register.oidcId);
      });
  });
});
