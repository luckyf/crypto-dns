import axios from 'axios';
import { CryptoDNSConfigurationI, CryptoDNSEntryI, DoHEntry } from './types/types';

const defaultConfig = { nameserverIP: '1.1.1.1' };

export const lookup = async (
  domain: string,
  config: CryptoDNSConfigurationI = defaultConfig,
): Promise<CryptoDNSEntryI[]> => {
  const result: CryptoDNSEntryI[] = [];

  const dnsResponse = await axios.get(`https://${config.nameserverIP}/dns-query`, {
    headers: { accept: 'application/dns-json' },
    params: { name: domain, type: 'TXT', do: true, cd: false },
  });

  if (dnsResponse.status !== 200) {
    throw new Error('Failed to fetch entries from DNS server');
  }

  try {
    dnsResponse.data.Answer.forEach((entry: DoHEntry) => {
      if (entry.type !== 16) {
        return;
      }
      const dnsEntry = entry.data.match(
        /^"+crypto:(?<formatVersion>\d):(?<priority>\d{1,3})\s(?<currency>\w+):(?<walletAddress>.*)"+/,
      );
      if (!dnsEntry) {
        return;
      }

      result.push({
        version: Number(dnsEntry.groups?.formatVersion),
        priority: Number(dnsEntry.groups?.priority),
        currency: dnsEntry.groups?.currency.toUpperCase() || '',
        address: dnsEntry.groups?.walletAddress || '',
      });
    });
  } catch (error) {
    throw new Error(`Failed to parse DNS entry: ${error}`);
  }

  return result;
};

export const lookupMany = async (
  domain: string,
  currency: string,
  config: CryptoDNSConfigurationI = defaultConfig,
): Promise<CryptoDNSEntryI[]> => {
  // Request addresses from DNS
  const result = await lookup(domain, config);

  return (
    result
      // Filter addresses for one currency
      .filter((element) => {
        return element.currency === currency.toUpperCase();
      })
      // Sort addresses by priority
      .sort((a, b) => {
        return a.priority - b.priority ? 1 : b.priority - a.priority ? -1 : 0;
      })
  );
};

export const lookupOne = async (
  domain: string,
  currency: string,
  config: CryptoDNSConfigurationI = defaultConfig,
): Promise<string | null> => {
  // Request addresses for one currency
  let lookupResult = await lookupMany(domain, currency, config);

  // Return null if no address has been received
  if (!lookupResult.length) {
    return null;
  }

  // Determine highest priority
  const highestPrio = lookupResult[0].priority;
  // Filter for highest priority
  lookupResult = lookupResult.filter((element) => {
    return element.priority === highestPrio;
  });

  // If multiple addresses are set, select one random address
  return lookupResult[Math.floor(Math.random() * lookupResult.length)].address;
};

//const main = async () => {
//  console.log(await lookup('thirdweb.de'));
//  console.log(await lookupMany('thirdweb.de', 'eth'));
//  console.log(await lookupOne('thirdweb.de', 'eth'));
//};
//main();
