export interface DoHEntry {
  name: string;
  type: number;
  TTL: number;
  data: string;
}
export interface CryptoDNSConfigurationI {
  nameserverIP: string;
}

export interface CryptoDNSEntryI {
  version: number;
  priority: number;
  currency: string;
  address: string;
}
