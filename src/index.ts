import DnsOverHttpResolver from 'dns-over-http-resolver';
import { CryptoDNSConfigurationI, CryptoDNSEntryI } from './types/types';

const defaultConfig = { nameserverURL: 'https://1.1.1.1/dns-query' };

export const lookup = async (
  domain: string,
  config: CryptoDNSConfigurationI = defaultConfig,
): Promise<CryptoDNSEntryI[]> => {
  const result: CryptoDNSEntryI[] = [];

  const dohResolver = new DnsOverHttpResolver({ maxCache: 0 });
  dohResolver.setServers([config.nameserverURL]);

  const dnsResponse = dohResolver.resolveTxt(domain);
  console.log(dnsResponse);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //const dnsResponse: any = await dot.lookup(domain, { rrtype: 'TXT', json: false, decode: false, dnssec: true });

  //if (dnsResponse.rcode !== 'NOERROR') {
  //  // TODO: Handle error
  //  return [];
  //}
  //
  //// TODO: Validate DNSSEC
  //// eslint-disable-next-line no-constant-condition
  //if (false) {
  //  return [];
  //}
  //
  //dnsResponse.answers.forEach((entry: any) => {
  //  if (entry.type !== 'TXT') {
  //    return;
  //  }
  //  const [protocolString, walletString]: string[] = entry.data.toString().split(' ');
  //  const [, protocolVersion, priority] = protocolString.split(':');
  //  const [, address] = walletString.split(':');
  //  let [currency] = walletString.split(':');
  //  currency = currency.toUpperCase();
  //
  //  result.push({
  //    version: Number(protocolVersion),
  //    priority: Number(priority),
  //    currency: currency,
  //    address: address,
  //  });
  //});

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
