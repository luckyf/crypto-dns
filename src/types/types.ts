export interface CryptoDNSConfigurationI {
  nameserverURL: string;
}

export interface CryptoDNSEntryI {
  version: number;
  priority: number;
  currency: string;
  address: string;
}
