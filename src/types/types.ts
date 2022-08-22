export interface DoHEntry {
  name: string;
  type: number;
  TTL: number;
  data: string;
}
export interface CryptoDNSConfigurationI {
  nameserver?: string;
  timeout?: number;
}

export interface CryptoDNSConfigurationDefaultI {
  nameserver: string;
  timeout: number;
}

export interface CryptoDNSEntryI {
  version: number;
  priority: number;
  currency: string;
  address: string;
}
