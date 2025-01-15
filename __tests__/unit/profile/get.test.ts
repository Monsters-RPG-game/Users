import { describe, expect, it } from '@jest/globals';
import mongoose from 'mongoose';
import * as errors from '../../../src/errors/index.js';
import GetProfileDto from '../../../src/modules/profile/subModules/get/dto.js';
import type { IGetProfileDto } from '../../../src/modules/profile/subModules/get/types.js';
import type { IFullError } from '../../../src/types/index.js'

describe('Profile - get', () => {
  const userId: IGetProfileDto = {
    id: new mongoose.Types.ObjectId().toString(),
  };

  describe('Should throw', () => {
    describe('No data passed', () => {
      it('Missing userId', () => {
        const target = new errors.MissingArgError('id')
        let error: IFullError | undefined  = undefined
        const clone = structuredClone(userId);
        clone.id = undefined!;

        try {
          new GetProfileDto(clone);
        } catch (err) {
          error = err as IFullError
        }

        expect(error!.message).toEqual(target.message);
        expect(error!.code).toEqual(target.code);
      });
    });

    describe('Incorrect data', () => {
      it('Incorrect userId', () => {
        const target = new errors.IncorrectArgTypeError('id should be objectId')
        let error: IFullError | undefined = undefined
        const clone = structuredClone(userId);
        clone.id = 'asd';

        try {
          new GetProfileDto(clone);
        } catch (err) {
          error = err as IFullError
        }

        expect(error!.message).toEqual(target.message);
        expect(error!.code).toEqual(target.code);
      });
    });
  });

  describe('Should pass', () => {
    it('Validated userId', () => {
      const data = new GetProfileDto(userId);
      expect(data.id).toEqual(userId.id);
    });
  });
});
