const { lookup, lookupOne, lookupMany } = require('crypto-dns');

const main = async () => {
  const resultLookup = await lookup('thirdweb.de');
  console.info(`\n\nlookup():`);
  console.log(resultLookup);
  /**
   * Returns:
   * [
   *   {
   *     version: 1,
   *     priority: 10,
   *     currency: 'BTC',
   *     address: 'bc1qt44xtffh368az9s6r4qa3cgf4sqzjq2hk7nneu'
   *   },
   *   {
   *     version: 1,
   *     priority: 10,
   *     currency: 'ETH',
   *     address: '0xB9Af69a9850a98d9Fb66Ce210E88021Ad583961a'
   *   },
   *   {
   *     version: 1,
   *     priority: 10,
   *     currency: 'ETH',
   *     address: '0xD982065960f77282eDB555b43B175Cf3A7dAC72d'
   *   },
   *   {
   *     version: 1,
   *     priority: 20,
   *     currency: 'ETH',
   *     address: '0xccaa72d80EeB1A2Ac91B6Fdebff995D55ea9368a'
   *   },
   *   {
   *     version: 1,
   *     priority: 10,
   *     currency: 'MATIC',
   *     address: '0xD982065960f77282eDB555b43B175Cf3A7dAC72d'
   *   }
   * ]
   */

  const resultLookupOne = await lookupOne('thirdweb.de', 'ETH');
  console.info(`\n\nlookupOne():`);
  console.log(resultLookupOne);
  /**
   * Returns:
   * 0xB9Af69a9850a98d9Fb66Ce210E88021Ad583961a
   */

  const resultLookupMany = await lookupMany('thirdweb.de', 'ETH');
  console.info(`\n\nlookupMany():`);
  console.log(resultLookupMany);
  /**
   * Returns:
   * [
   *   {
   *     version: 1,
   *     priority: 10,
   *     currency: 'ETH',
   *     address: '0xB9Af69a9850a98d9Fb66Ce210E88021Ad583961a'
   *   },
   *   {
   *     version: 1,
   *     priority: 10,
   *     currency: 'ETH',
   *     address: '0xD982065960f77282eDB555b43B175Cf3A7dAC72d'
   *   },
   *   {
   *     version: 1,
   *     priority: 20,
   *     currency: 'ETH',
   *     address: '0xccaa72d80EeB1A2Ac91B6Fdebff995D55ea9368a'
   *   }
   * ]
   */
};

main();
