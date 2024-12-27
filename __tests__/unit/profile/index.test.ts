import { describe, expect, it } from '@jest/globals';
import mongoose from 'mongoose';
import * as errors from '../../../src/errors/index.js';
import GetProfileDto from '../../../src/modules/profile/subModules/get/dto.js';
import type { IGetProfileDto } from '../../../src/modules/profile/subModules/get/types.js';

describe('Profile', () => {
  const userId: IGetProfileDto = {
    id: new mongoose.Types.ObjectId().toString(),
  };

  describe('Should throw', () => {
    describe('No data passed', () => {
      it('Missing userId', () => {
        const clone = structuredClone(userId);
        clone.id = undefined!;

        try {
          new GetProfileDto(clone);
        } catch (err) {
          expect(err).toEqual(new errors.MissingArgError('id'));
        }
      });
    });

    describe('Incorrect data', () => {
      it('Incorrect userId', () => {
        const clone = structuredClone(userId);
        clone.id = 'asd';

        try {
          new GetProfileDto(clone);
        } catch (err) {
          expect(err).toEqual(new errors.IncorrectArgTypeError('id should be objectId'));
        }
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
