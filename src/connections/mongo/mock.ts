import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import Log from 'simpleLogger';
import { EFakeData } from '../../../__tests__/utils/fakeFactory/enums/index.js';
import { fakeData, FakeFactory } from '../../../__tests__/utils/index.js';
import type { IFakeState } from '../../../__tests__/utils/fakeFactory/types/data.js';
import type { IProfileEntity } from '../../modules/profile/entity.js';
import type { IUserEntity } from '../../modules/users/entity.js';

export default class Mock {
  private readonly _fakeFactory: FakeFactory | undefined = undefined;

  constructor() {
    this._fakeFactory = new FakeFactory();
  }

  private get fakeFactory(): FakeFactory {
    return this._fakeFactory!;
  }

  async init(): Promise<void> {
    const server = await MongoMemoryServer.create();
    await mongoose.connect(server.getUri());

    await this.fulfillDatabase();
    Log.log('Mongo', 'Started mock server');
  }

  private async fulfillDatabase(): Promise<void> {
    const users = fakeData.users as IUserEntity[];
    const profiles = fakeData.profiles as IProfileEntity[];

    await this.fillData(EFakeData.User, users);

    await Promise.all(
      profiles.map(async (p) => {
        const db = new FakeFactory();

        return db.profile.user(p.user).create();
      }),
    );
  }

  private async fillData<T extends EFakeData>(type: T, params: IFakeState[T][]): Promise<void> {
    const target = this.fakeFactory[type];

    await Promise.all(
      params.map(async (p) => {
        for (const m of Object.getOwnPropertyNames(Object.getPrototypeOf(target))) {
          if (
            m === 'constructor' ||
            m === 'create' ||
            m === 'fillState' ||
            typeof target[m as keyof typeof target] !== 'function'
          )
            continue;

          const method = target[m as keyof typeof target] as (arg: unknown) => void;
          method.call(target, p[m as keyof typeof p]);
        }
        await target.create();
      }),
    );
  }
}
