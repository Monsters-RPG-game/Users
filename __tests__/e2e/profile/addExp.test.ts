import { afterEach, describe, expect, it } from '@jest/globals';
import * as enums from '../../../src/enums';
import * as errors from '../../../src/errors';
import AddExpController from '../../../src/modules/profile/addExp';
import GetController from '../../../src/modules/profile/get';
import * as utils from '../../utils';
import { fakeData } from '../../utils';
import type { IInventoryEntity } from '../../../src/modules/inventory/entity';
import type { IPartyEntity } from '../../../src/modules/party/entity';
import type { IAddExpDto } from '../../../src/modules/profile/addExp/types';
import type { IProfileEntity } from '../../../src/modules/profile/entity';
import type { IStatsEntity } from '../../../src/modules/stats/entity';
import type * as types from '../../../src/types';

describe('Profile', () => {
  const db = new utils.FakeFactory();
  const fake = fakeData.profiles[0] as IProfileEntity;
  const fakeInv = fakeData.inventories[0] as IInventoryEntity;
  const fakeParty = fakeData.parties[0] as IPartyEntity;
  const fakeStats = fakeData.stats[0] as IStatsEntity;

  const localUser: types.ILocalUser = {
    userId: fake.user,
    tempId: 'tempId',
    validated: true,
    type: enums.EUserTypes.User,
  };

  const payload: IAddExpDto = {
    profileId: fake._id,
    exp: 1,
  };

  const addExpController = new AddExpController();
  const getController = new GetController();

  afterEach(async () => {
    await db.cleanUp();
  });

  describe('Should throw', () => {
    describe('No data passed', () => {
      it('Missing profileId', () => {
        const clone = structuredClone(payload);
        clone.profileId = undefined!;

        addExpController.addExp(clone).catch((err) => {
          expect(err).toEqual(new errors.MissingArgError('profileId'));
        });
      });

      it('Missing exp', () => {
        const clone = structuredClone(payload);
        clone.exp = undefined!;

        addExpController.addExp(clone).catch((err) => {
          expect(err).toEqual(new errors.MissingArgError('exp'));
        });
      });
    });

    describe('Incorrect data', () => {
      it('Incorrect profileId', () => {
        const clone = structuredClone(payload);
        clone.profileId = 'asdasd';

        addExpController.addExp(clone).catch((err) => {
          expect(err).toEqual(new errors.IncorrectArgTypeError('profileId should be objectId'));
        });
      });

      it('Incorrect exp', () => {
        const clone = structuredClone(payload);
        clone.exp = 'asd' as unknown as number;

        addExpController.addExp(clone).catch((err) => {
          expect(err).toEqual(new errors.IncorrectArgTypeError('exp should be number'));
        });
      });

      it('Profile doesnt exist', async () => {
        const clone = structuredClone(payload);
        clone.profileId = '6654dfac05e824f05a539648';
        try {
          await addExpController.addExp(clone);
        } catch (err) {
          expect(err).not.toBeUndefined();
        }
      });
    });
  });

  describe('Should pass', () => {
    it('Exp raised by 1', async () => {
      await db.profile
        .user(localUser.userId)
        .race(fake.race)
        .lvl(fake.lvl)
        .exp(fake.exp)
        .friends(fake.friends)
        ._id(fake._id)
        .inventory(fakeInv._id)
        .party(fakeParty._id)
        .stats(fakeStats._id)
        .create();
      await addExpController.addExp(payload);

      const profile = (await getController.getById({ id: payload.profileId }))!;
      expect(profile.exp).toEqual(2);
    });

    it('Lvl raised by 1', async () => {
      await db.profile
        .user(localUser.userId)
        .race(fake.race)
        .lvl(fake.lvl)
        .exp(fake.exp)
        .friends(fake.friends)
        ._id(fake._id)
        .inventory(fakeInv._id)
        .party(fakeParty._id)
        .stats(fakeStats._id)
        .create();
      const clone = structuredClone(payload);
      clone.exp = 39;
      await addExpController.addExp(clone);

      const profile = (await getController.getById({ id: payload.profileId }))!;
      expect(profile.exp).toEqual(40);
      expect(profile.lvl).toEqual(2);
    });
  });
});
