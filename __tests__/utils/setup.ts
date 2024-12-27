import { afterAll, beforeAll } from '@jest/globals';
import Connection from './connections.js';
import FakeBroker from './fakes/broker.js'
import State from '../../src/tools/state.js'

const connection = new Connection();

beforeAll(async () => {
  await connection.connect();
  const broker = new FakeBroker()
  State.broker = broker
});

afterAll(async () => {
  await connection.close();
});

export default { connection };
