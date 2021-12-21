# Crypto DNS

This packages translates domain names into crypto wallet addresses, using standard TXT records set by the DNS.

> WARNING: This package is currently in BETA and not yet production ready.

TODO: Describe update cycle.

## Motivation

TODO

https://ma.ttias.be/proposal-cryptocurrency-addresses-dns/

## Installation

Using npm:

```bash
npm install crypto-dns
```

Using yarn:

```bash
yarn add crypto-dns
```

## Example

Lookup single address for a currency with the highest priority:

```typescript
import { lookupOne } from 'crypto-dns';

const lookupSingleAddress = await lookupOne('thirdweb.de', 'ETH');
// -> string
// 0xD982065960f77282eDB555b43B175Cf3A7dAC72d
```

You can also lookup all addresses for a currency (sorted by priority):

```typescript
import { lookupMany } from 'crypto-dns';

const lookupMultipleAddresses = await lookupMany('thirdweb.de', 'ETH');
// -> array
//[
//  {
//    version: 1,
//    priority: 10,
//    currency: 'ETH',
//    address: '0xB9Af69a9850a98d9Fb66Ce210E88021Ad583961a',
//  },
//  {
//    version: 1,
//    priority: 10,
//    currency: 'ETH',
//    address: '0xD982065960f77282eDB555b43B175Cf3A7dAC72d',
//  },
//  {
//    version: 1,
//    priority: 20,
//    currency: 'ETH',
//    address: '0xccaa72d80EeB1A2Ac91B6Fdebff995D55ea9368a',
//  },
//];
```

To receive addresses for every available currency you can use the `lookup` method:

```typescript
import { lookup } from 'crypto-dns';

const lookupResultForAllCurrencies = await lookup('thirdweb.de');
// -> array
//[
//  {
//    version: 1,
//    priority: 10,
//    currency: 'ETH',
//    address: '0xB9Af69a9850a98d9Fb66Ce210E88021Ad583961a',
//  },
//  ...
//  {
//    version: 1,
//    priority: 10,
//    currency: 'MATIC',
//    address: '0xD982065960f77282eDB555b43B175Cf3A7dAC72d',
//  },
//];
```

## Features

- Use your domain as alias for your crypto wallet addresses
- Available for every crypto currency
- Works with your main domain and all subdomains
- Use priority to

### DNS format

```
crypto:<formatVersion>:<priority> <currency>:<walletAddress>
```

| Keyword       | Description                                                                                                                             |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| formatVersion | Version of the format of the DNS string Currently only `1` is available.                                                                |
| priority      | Specify priority of the entry. The lower, the higher priority.                                                                          |
| currency      | Symbol of the crypto currency (case-insensitive). Use [CoinMarketCap](https://coinmarketcap.com/de/all/views/all/) to find all symbols. |
| walletAddress | String with your wallet address. The format depends on the currency.                                                                    |

Examples:

```
`crypto:v1:10 eth:0xD982065960f77282eDB555b43B175Cf3A7dAC72d`
`crypto:v1:10 matic:0xD982065960f77282eDB555b43B175Cf3A7dAC72d`
`crypto:v1:10 btc:XXXX`
```

### How to use subdomains

Subdomains can be used like root domains. Just use your subdomain when adding it to the DNS instead of the `@` path.

### Lookup Flow

TODO

## Tests

You can validate all tests by running:

```bash
yarn test
```

## License

This library is licensed under the [**MIT License**](https://github.com/LuckyF/crypto-dns/blob/main/LICENSE.md).

## Bugs & Feature Requests

For Bug reports or feature requests, please [create an issue](https://github.com/LuckyF/crypto-dns/issues) in the crypto-dns repository.

## Support

If you would like to support the development of this project, feel free to [contact me via mail](mailto:hey@frischknecht.dev?subject=Support%20Crypto-DNS).
