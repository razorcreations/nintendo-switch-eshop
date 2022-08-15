import { getGamesJapan } from '../src';

test('getGamesJapan', async () => {
  const games = await getGamesJapan();

  expect(games).toBeInstanceOf(Object);
}, 60000);
