import defaultGetGamesBrazil, { getGamesBrazil } from '../src';

describe('getGamesBrazil', () => {
  test('should allow no options', async () => {
    const data = await getGamesBrazil();

    expect(data).toBeInstanceOf(Object);
    expect(data.length).toBeGreaterThanOrEqual(1500);
  }, 60000);

  test('should work with default export', () => {
    expect(defaultGetGamesBrazil).not.toBeUndefined();
  });
});
