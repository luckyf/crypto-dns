# Crypto DNS

This packages translates domain names into crypto wallet addresses, using standard TXT records set by the DNS.

WARNING: This package is currently in BETA and not yet production ready.

TODO

## Motivation

TODO

https://ma.ttias.be/proposal-cryptocurrency-addresses-dns/

## Installation

TODO

Useing npm: `npm install crypto-dns`
Using yarn: `yarn add crypto-dns`

## Example

```typescript
import { lookup, lookupMany, lookupOne } from 'crypto-dns';

// Receive only one address of a currency with the highest priority
const lookupSingleAddress = await lookupOne('thirdweb.de', 'ETH');
// 0xD982065960f77282eDB555b43B175Cf3A7dAC72d

// Receive all addresses of a currency
const lookupMultipleAddresses = await lookupMany('thirdweb.de', 'ETH');
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

// Receive all addresses of all currencies
const lookupResultForAllCurrencies = await lookup('thirdweb.de');
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

### DNS format

TODO

`crypto:v1:10 eth:XXXXX`  
`crypto:v1:10 matic:XXXXX`  
`crypto:v1:10 btc:XXXX`

### How to use subdomains

TODO

### Lookup Flow

TODO

#### Add new wallet to DNS

TODO

#### Receive wallet from DNS

TODO

- Check Prerequisites
  - DNSSEC enabled
  - Crypto TXT entries available
- Process and return entries

# Tests

TODO

# Contributing

TODO

# License

TODO

**MIT**

# Support

TODO
