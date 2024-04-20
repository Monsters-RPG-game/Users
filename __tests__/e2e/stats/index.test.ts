import { afterEach, describe, expect, it } from '@jest/globals';
import mongoose from 'mongoose';
import * as enums from '../../../src/enums';
import * as errors from '../../../src/errors';
import AddController from '../../../src/modules/profile/add';
import GetController from '../../../src/modules/stats/get';
import * as utils from '../../utils';
import { fakeData } from '../../utils';
import type { IInventoryEntity } from '../../../src/modules/inventory/entity';
import type { IPartyEntity } from '../../../src/modules/party/entity';
import type { IAddProfileDto } from '../../../src/modules/profile/add/types';
import type { IProfileEntity } from '../../../src/modules/profile/entity';
import type { IStatsEntity } from '../../../src/modules/stats/entity';
import type { IGetStatsDto } from '../../../src/modules/stats/get/types';
import type * as types from '../../../src/types';

describe('Stats', () => {
  const db = new utils.FakeFactory();
  const id = utils.fakeData.users[0]!._id;
  const race: IAddProfileDto = {
    race: enums.EUserRace.Human,
  };
  const fake = fakeData.profiles[1] as IProfileEntity;
  const fakeInv = fakeData.inventories[0] as IInventoryEntity;
  const fakeParty = fakeData.parties[0] as IPartyEntity;
  const fakeStats = fakeData.stats[0] as IStatsEntity;
  const userId: IGetStatsDto = {
    id,
  };
  const localUser: types.ILocalUser = {
    userId: undefined,
    tempId: 'tempId',
    validated: true,
    type: enums.EUserTypes.User,
  };
  const localUser2: types.ILocalUser = {
    userId: new mongoose.Types.ObjectId().toString(),
    tempId: 'tempId',
    validated: true,
    type: enums.EUserTypes.User,
  };
  const localUser3: types.ILocalUser = {
    userId: new mongoose.Types.ObjectId().toString(),
    tempId: 'tempId',
    validated: true,
    type: enums.EUserTypes.User,
  };
  const addController = new AddController();
  const getController = new GetController();

  afterEach(async () => {
    await db.cleanUp();
  });

  describe('Should throw', () => {
    describe('No data passed', () => {
      it('Missing race', () => {
        const clone = structuredClone(race);
        clone.race = undefined!;

        addController.add(clone, localUser).catch((err) => {
          expect(err).toEqual(new errors.MissingArgError('race'));
        });
      });

      it('Missing userId', () => {
        const clone = structuredClone(userId);
        clone.id = undefined!;

        getController.get(clone).catch((err) => {
          expect(err).toEqual(new errors.MissingArgError('id'));
        });
      });
    });

    describe('Incorrect data', () => {
      it('Incorrect race', () => {
        const clone = structuredClone(race);
        clone.race = 'test' as enums.EUserRace;

        addController.add(clone, localUser).catch((err) => {
          expect(err).toEqual(new errors.IncorrectArgTypeError('race has incorrect type'));
        });
      });

      it('Incorrect userId', () => {
        const clone = structuredClone(userId);
        clone.id = 'asd';

        getController.get(clone).catch((err) => {
          expect(err).toEqual(new errors.IncorrectArgTypeError('id should be objectId'));
        });
      });

      it('Stats do not exist', async () => {
        const stats = await getController.get(userId);
        expect(stats).toBeNull();
      });
    });
  });

  describe('Should pass', () => {
    it('Got stats', async () => {
      await db.stats.owner(localUser3.userId).intelligence(1).strength(1).initialized(true)._id(fakeStats._id).create();

      const stats = (await getController.get({ id: fakeStats._id }))!;

      expect(stats.intelligence).toEqual(1);
      expect(stats.strength).toEqual(1);
    });

    it('Initialized stats', async () => {
      await db.profile
        .user(localUser2.userId)
        .race(fake.race)
        .lvl(fake.lvl)
        .exp(fake.exp)
        .friends(fake.friends)
        .inventory(fakeInv._id)
        .party(fakeParty._id)
        .stats(fakeStats._id)
        .create();

      try {
        await addController.add(race, localUser2);
      } catch (err) {
        expect(err).toBeUndefined();
      }
    });
  });
});
