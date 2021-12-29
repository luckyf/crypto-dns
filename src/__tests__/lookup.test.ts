import axios from 'axios';
import { lookup } from '../index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Test DNS lookup', () => {
  test('Network outage (axios error)', async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.reject({
        request: {},
        response: undefined,
        message: 'timeout of XXXms exceeded',
        code: 'ECONNABORTED',
        isAxiosError: true,
      }),
    );

    expect.assertions(1);
    try {
      await lookup('thirdweb.de');
    } catch (error) {
      expect(error.message).toMatch(/Network error :.*/);
    }
  });

  test('DoH request - 400', async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.reject({
        request: {},
        response: {
          status: 400,
          statusText: 'Bad Request',
        },
        message: 'Request failed with status code 400',
        code: undefined,
        isAxiosError: true,
      }),
    );

    expect.assertions(1);
    try {
      await lookup('thirdweb.de');
    } catch (error) {
      expect(error.message).toMatch(/Network error :.*/);
    }
  });

  test('DoH request - 500', async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.reject({
        request: {},
        response: {
          status: 500,
          statusText: 'Internal Error',
        },
        message: 'Request failed with status code 500',
        code: undefined,
        isAxiosError: true,
      }),
    );

    expect.assertions(1);
    try {
      await lookup('thirdweb.de');
    } catch (error) {
      expect(error.message).toMatch(/Network error :.*/);
    }
  });

  test('Request error (no DoH server)', async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {},
        status: 200,
      }),
    );

    expect.assertions(1);
    try {
      await lookup('thirdweb.de');
    } catch (error) {
      expect(error.message).toMatch('Unplausible DoH response');
    }
  });

  test('DoH error', async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          Status: 1,
          Answer: [],
        },
        status: 200,
      }),
    );

    expect.assertions(1);
    try {
      await lookup('thirdweb.de');
    } catch (error) {
      expect(error.message).toMatch('Failed DoH response');
    }
  });

  test('DNS Verification', async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          Status: 0,
          TC: false,
          RD: true,
          RA: true,
          AD: false,
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
              type: 46,
              TTL: 300,
              data: 'TXT ECDSAP256SHA256 2 300 1640864421 1640684421 34505 thirdweb.de. IHsOcPmC0fVP3aVofEadAKKpZrUeGuro6UBlRdOBMjdLw1+ekfmdxOymjVpbdmb8hK03WRGUkqTA3ngDMDTs6Q==',
            },
          ],
        },
        status: 200,
      }),
    );

    expect.assertions(1);
    try {
      await lookup('thirdweb.de');
    } catch (error) {
      expect(error.message).toMatch('Failed DNSSEC validation');
    }
  });

  test('Correct DoH request', async () => {
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
              type: 46,
              TTL: 300,
              data: 'TXT ECDSAP256SHA256 2 300 1640864421 1640684421 34505 thirdweb.de. IHsOcPmC0fVP3aVofEadAKKpZrUeGuro6UBlRdOBMjdLw1+ekfmdxOymjVpbdmb8hK03WRGUkqTA3ngDMDTs6Q==',
            },
          ],
        },
        status: 200,
      }),
    );

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

describe('Test "lookup" function', () => {
  test('Multiple addresses', async () => {
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

    const result = await lookup('thirdweb.de');

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          version: 1,
          priority: 10,
          currency: 'BTC',
          address: 'bc1qt44xtffh368az9s6r4qa3cgf4sqzjq2hk7nneu',
        }),
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

  test('No address', async () => {
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
          Answer: [],
        },
        status: 200,
      }),
    );

    const result = await lookup('thirdweb.de');

    expect(result).toEqual([]);
  });

  test('Malformed addresses', async () => {
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
              data: '"crypto:1:156 btc;bc1qt44xtffh368az9s6r4qa3cgf4sqzjq2hk7nneu"',
            },
            {
              name: 'thirdweb.de',
              type: 16,
              TTL: 300,
              data: '"crypto:1:11btc;bc1qt44xtffh368az9s6r4qa3cgf4sqzjq2hk7nneu"',
            },
            {
              name: 'thirdweb.de',
              type: 16,
              TTL: 300,
              data: '"coin:1:10btc;bc1qt44xtffh368az9s6r4qa3cgf4sqzjq2hk7nneu"',
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

    const result = await lookup('thirdweb.de');

    expect(result).toEqual([]);
  });
});
