import { lookup } from './index';
describe('Test real DNS lookup', () => {
  test('Cloudflare DNS server', async () => {
    const result = await lookup('thirdweb.de', { nameserver: 'https://1.1.1.1/dns-query' });

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          version: 1,
          priority: 10,
          currency: 'BTC',
          address: 'bc1qt44xtffh368az9s6r4qa3cgf4sqzjq2hk7nneu',
        }),
      ]),
    );
  });

  test('Google DNS server', async () => {
    const result = await lookup('thirdweb.de', { nameserver: 'https://8.8.8.8/resolve' });

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          version: 1,
          priority: 10,
          currency: 'BTC',
          address: 'bc1qt44xtffh368az9s6r4qa3cgf4sqzjq2hk7nneu',
        }),
      ]),
    );
  });

  test('Correct DoH request', async () => {
    const result = await lookup('thirdweb.de');

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          version: 1,
          priority: 10,
          currency: 'BTC',
          address: 'bc1qt44xtffh368az9s6r4qa3cgf4sqzjq2hk7nneu',
        }),
      ]),
    );
  });
});
