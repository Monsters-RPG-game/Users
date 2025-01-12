import Connection from './connections.js';
import fakeData from './fakeData.json' with { type: "json" };
import FakeFactory from './fakeFactory/src/index.js';

const generateRandomName = (): string => {
  const vocabulary = 'ABCDEFGHIJKLMNOUPRSTUWZabcdefghijklmnouprstuwz';
  let name = '';
  for (let x = 0; x < 12; x++) {
    name += vocabulary[Math.floor(Math.random() * vocabulary.length)];
  }
  return name;
};

export { fakeData, Connection, FakeFactory, generateRandomName };
