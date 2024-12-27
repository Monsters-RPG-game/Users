import { describe, expect, it } from '@jest/globals';
import * as errors from '../../../src/errors/index.js';
import RemoveUserDto from '../../../src/modules/users/subModules/remove/dto.js';
import * as utils from '../../utils/index.js';
import type { IUserEntity } from '../../../src/modules/users/entity.js';
import type { IRemoveUserDto } from '../../../src/modules/users/subModules/remove/types.js';

describe('Remove', () => {
  const fakeUser = utils.fakeData.users[0] as IUserEntity;
  const removeDto: Partial<IRemoveUserDto> = {
    password: fakeUser.password,
  };

  describe('Should throw', () => {
    describe('No data passed', () => {
      Object.keys(removeDto).forEach((k) => {
        return it(`Missing ${k}`, () => {
          const clone = structuredClone(removeDto);
          delete clone[k as keyof typeof clone];

          try {
            new RemoveUserDto(clone as IRemoveUserDto, fakeUser._id as string);
          } catch (err) {
            expect(err).toEqual(new errors.MissingArgError(k));
          }
        });
      });
    });

    describe('Incorrect data', () => {
      it('UserId is not objectId', () => {
        const clone = structuredClone(removeDto);

        try {
          new RemoveUserDto(clone as IRemoveUserDto, 1 as unknown as string);
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
