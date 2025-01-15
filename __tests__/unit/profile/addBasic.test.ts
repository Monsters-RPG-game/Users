import { describe, expect, it } from '@jest/globals';
import mongoose from 'mongoose';
import { IFullError } from '../../../src/types/index.js'
import * as errors from '../../../src/errors/index.js';
import AddBasicProfileDto from '../../../src/modules/profile/subModules/addBasic/dto.js';
import type { IAddBasicProfileDto } from '../../../src/modules/profile/subModules/addBasic/types.js';

describe('Profile - add basic', () => {
  const userId: IAddBasicProfileDto = {
    user: new mongoose.Types.ObjectId().toString(),
  };

  describe('Should throw', () => {
    describe('No data passed', () => {
      it('Missing user', () => {
        const target = new errors.MissingArgError('user')
        let error: IFullError | undefined = undefined
        const clone = structuredClone(userId);
        clone.user = undefined!;

        try {
          new AddBasicProfileDto(clone);
        } catch (err) {
         error = err as IFullError
        }

        expect(error!.message).toEqual(target.message);
        expect(error!.code).toEqual(target.code);
      });
    });

    describe('Incorrect data', () => {
      it('Incorrect userId', () => {
        const target = new errors.IncorrectArgTypeError('user should be objectId')
        let error: IFullError | undefined = undefined
        const clone = structuredClone(userId);
        clone.user = 'asd';

        try {
          new AddBasicProfileDto(clone);
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
      const data = new AddBasicProfileDto(userId);

      expect(data.user).toEqual(userId.user);
    });
  });
});
