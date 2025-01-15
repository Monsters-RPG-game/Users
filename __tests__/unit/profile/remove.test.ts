import { describe, expect, it } from '@jest/globals';
import mongoose from 'mongoose';
import { IFullError } from '../../../src/types/index.js'
import * as errors from '../../../src/errors/index.js';
import RemoveProfileDto from '../../../src/modules/profile/subModules/remove/dto.js';
import type { IRemoveProfileDto } from '../../../src/modules/profile/subModules/remove/types.js';

describe('Profile - remove', () => {
  const userId: IRemoveProfileDto = {
    id: new mongoose.Types.ObjectId().toString(),
  };

  describe('Should throw', () => {
    describe('No data passed', () => {
      it('Missing id', () => {
        const target = new errors.MissingArgError('id')
        let error: IFullError | undefined = undefined
        const clone = structuredClone(userId);
        clone.id = undefined!;

        try {
          new RemoveProfileDto(clone);
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
          new RemoveProfileDto(clone);
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
      let error: IFullError | undefined = undefined

      try {
        new RemoveProfileDto(userId);
      } catch (err) {
      error = err as IFullError
      }

      expect(error).toBeUndefined()
    });
  });
});
