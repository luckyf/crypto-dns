import { lookup, lookupMany, lookupOne } from '../index';

test('lookup', () => {
  expect(lookup('thirdweb.de')).toBe([
    {
      version: 1,
      priority: 10,
      currency: 'ETH',
      address: '0xB9Af69a9850a98d9Fb66Ce210E88021Ad583961a',
    },
    {
      version: 1,
      priority: 10,
      currency: 'ETH',
      address: '0xD982065960f77282eDB555b43B175Cf3A7dAC72d',
    },
    {
      version: 1,
      priority: 20,
      currency: 'ETH',
      address: '0xccaa72d80EeB1A2Ac91B6Fdebff995D55ea9368a',
    },
    {
      version: 1,
      priority: 10,
      currency: 'MATIC',
      address: '0xD982065960f77282eDB555b43B175Cf3A7dAC72d',
    },
  ]);
});
test('lookupMany', () => {
  expect(lookupMany('thirdweb.de', 'eth')).toBe([
    {
      version: 1,
      priority: 10,
      currency: 'ETH',
      address: '0xB9Af69a9850a98d9Fb66Ce210E88021Ad583961a',
    },
    {
      version: 1,
      priority: 10,
      currency: 'ETH',
      address: '0xD982065960f77282eDB555b43B175Cf3A7dAC72d',
    },
    {
      version: 1,
      priority: 20,
      currency: 'ETH',
      address: '0xccaa72d80EeB1A2Ac91B6Fdebff995D55ea9368a',
    },
  ]);
});
test('lookupOne', () => {
  expect(lookupOne('thirdweb.de', 'eth')).toMatch(
    /(0xB9Af69a9850a98d9Fb66Ce210E88021Ad583961a|0xD982065960f77282eDB555b43B175Cf3A7dAC72d)/,
  );
});
test('lookupOne', () => {
  expect(lookupOne('thirdweb.de', 'matic')).toBe('0xD982065960f77282eDB555b43B175Cf3A7dAC72d');
});
