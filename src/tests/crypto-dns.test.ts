import { lookup, lookupMany, lookupOne } from '../index';

test('lookup - Multiple DNS wallets of multiple currencies', async () => {
  const result = await lookup('thirdweb.de');

  expect(result).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        version: 1,
        priority: 10,
        currency: 'ETH',
        address: '0xB9Af69a9850a98d9Fb66Ce210E88021Ad583961a',
      }),
      expect.objectContaining({
        version: 1,
        priority: 10,
        currency: 'ETH',
        address: '0xD982065960f77282eDB555b43B175Cf3A7dAC72d',
      }),
      expect.objectContaining({
        version: 1,
        priority: 20,
        currency: 'ETH',
        address: '0xccaa72d80EeB1A2Ac91B6Fdebff995D55ea9368a',
      }),
      expect.objectContaining({
        version: 1,
        priority: 10,
        currency: 'MATIC',
        address: '0xD982065960f77282eDB555b43B175Cf3A7dAC72d',
      }),
    ]),
  );
});

test('lookup - Non existing wallet', async () => {
  const result = await lookup('test.de');
  expect(result).toEqual([]);
});

test('lookupMany - Multiple DNS wallets of single currency', async () => {
  const result = await lookupMany('thirdweb.de', 'eth');

  expect(result).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        version: 1,
        priority: 10,
        currency: 'ETH',
        address: '0xB9Af69a9850a98d9Fb66Ce210E88021Ad583961a',
      }),
      expect.objectContaining({
        version: 1,
        priority: 10,
        currency: 'ETH',
        address: '0xD982065960f77282eDB555b43B175Cf3A7dAC72d',
      }),
      expect.objectContaining({
        version: 1,
        priority: 20,
        currency: 'ETH',
        address: '0xccaa72d80EeB1A2Ac91B6Fdebff995D55ea9368a',
      }),
    ]),
  );
});

test('lookupMany - Non existing wallet', async () => {
  const result = await lookupMany('test.de', 'eth');
  expect(result).toEqual([]);
});

test('lookupOne - One of multiple DNS wallets', async () => {
  const result = await lookupOne('thirdweb.de', 'eth');
  expect(result).toMatch(
    /(0xB9Af69a9850a98d9Fb66Ce210E88021Ad583961a|0xD982065960f77282eDB555b43B175Cf3A7dAC72d|0xccaa72d80EeB1A2Ac91B6Fdebff995D55ea9368a)/,
  );
});

test('lookupOne - Single DNS wallet', async () => {
  const result = await lookupOne('thirdweb.de', 'matic');
  expect(result).toBe('0xD982065960f77282eDB555b43B175Cf3A7dAC72d');
});

test('lookupOne - Non existing wallet', async () => {
  const result = await lookupOne('test.de', 'eth');
  expect(result).toBe(null);
});
