import { describe, expect, it } from '@jest/globals';
import * as errors from '../../../src/errors';
import RemoveUserDto from '../../../src/modules/user/remove/dto';
import * as utils from '../../utils';
import type { IUserEntity } from '../../../src/modules/user/entity';
import type { IRemoveUserDto } from '../../../src/modules/user/remove/types';

describe('Remove', () => {
  const fakeUser = utils.fakeData.users[0] as IUserEntity;
  const remove: IRemoveUserDto = {
    password: fakeUser.password,
  };

  describe('Should throw', () => {
    describe('No data passed', () => {
      Object.keys(remove).forEach((k) => {
        return it(`Missing ${k}`, () => {
          const clone = structuredClone(remove);
          delete clone[k];

          try {
            new RemoveUserDto(clone, fakeUser._id);
          } catch (err) {
            expect(err).toEqual(new errors.MissingArgError(k));
          }
        });
      });
    });

    describe('Incorrect data', () => {
      it('UserId is not objectId', () => {
        const clone = structuredClone(remove);

        try {
          new RemoveUserDto(clone, 1 as unknown as string);
        } catch (err) {
          expect(err).toEqual(new errors.IncorrectArgTypeError('id should be a string'));
        }
      });
    });
  });

  describe('Should pass', () => {
    // To fill
  });
});
