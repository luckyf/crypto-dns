import axios from 'axios';
import { lookupOne } from '../index';

const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  mockedAxios.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: {
        Status: 0,
        TC: false,
        RD: true,
        RA: true,
        AD: true,
        CD: false,
        Question: [{ name: 'thirdweb.de', type: 16 }],
        Answer: [
          {
            name: 'thirdweb.de',
            type: 16,
            TTL: 300,
            data: '"crypto:1:10 btc:bc1qt44xtffh368az9s6r4qa3cgf4sqzjq2hk7nneu"',
          },
          {
            name: 'thirdweb.de',
            type: 16,
            TTL: 300,
            data: '"crypto:1:10 eth:0xB9Af69a9850a98d9Fb66Ce210E88021Ad583961a"',
          },
          {
            name: 'thirdweb.de',
            type: 16,
            TTL: 300,
            data: '"crypto:1:10 eth:0xD982065960f77282eDB555b43B175Cf3A7dAC72d"',
          },
          {
            name: 'thirdweb.de',
            type: 16,
            TTL: 300,
            data: '"crypto:1:20 eth:0xccaa72d80EeB1A2Ac91B6Fdebff995D55ea9368a"',
          },
          {
            name: 'thirdweb.de',
            type: 16,
            TTL: 300,
            data: '"crypto:1:10 matic:0xD982065960f77282eDB555b43B175Cf3A7dAC72d"',
          },
          {
            name: 'thirdweb.de',
            type: 46,
            TTL: 300,
            data: 'TXT ECDSAP256SHA256 2 300 1640864421 1640684421 34505 thirdweb.de. IHsOcPmC0fVP3aVofEadAKKpZrUeGuro6UBlRdOBMjdLw1+ekfmdxOymjVpbdmb8hK03WRGUkqTA3ngDMDTs6Q==',
          },
        ],
      },
      status: 200,
    }),
  );
});

describe('Test "lookupOne" function', () => {
  test('One of multiple DNS wallets', async () => {
    const result = await lookupOne('thirdweb.de', 'eth');

    expect(result).toMatch(
      /(0xB9Af69a9850a98d9Fb66Ce210E88021Ad583961a|0xD982065960f77282eDB555b43B175Cf3A7dAC72d|0xccaa72d80EeB1A2Ac91B6Fdebff995D55ea9368a)/,
    );
  });

  test('Single DNS wallet', async () => {
    const result = await lookupOne('thirdweb.de', 'matic');

    expect(result).toBe('0xD982065960f77282eDB555b43B175Cf3A7dAC72d');
  });

  test('lookupOne - Non existing wallet', async () => {
    const result = await lookupOne('thirdweb', 'sol');

    expect(result).toBe(null);
  });
});
