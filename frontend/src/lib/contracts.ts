/**
 * BitSave Smart Contract Configuration
 * 
 * Live testnet contracts deployed on Stacks
 * Network: Testnet
 * Deployer: ST2QR5BT57BTVQM69ZFQBMW3BH7KDN3FX56H02TEW
 */

export const NETWORK = 'testnet' as const;

export const CONTRACTS = {
  bitsave: {
    address: 'ST2QR5BT57BTVQM69ZFQBMW3BH7KDN3FX56H02TEW',
    name: 'bitsave-v2',
    fullId: 'ST2QR5BT57BTVQM69ZFQBMW3BH7KDN3FX56H02TEW.bitsave-v2',
  },
  bitsaveBadges: {
    address: 'ST2QR5BT57BTVQM69ZFQBMW3BH7KDN3FX56H02TEW',
    name: 'bitsave-badges',
    fullId: 'ST2QR5BT57BTVQM69ZFQBMW3BH7KDN3FX56H02TEW.bitsave-badges',
  },
} as const;

// Explorer URLs
export const EXPLORER_URLS = {
  transaction: (txId: string) =>
    `https://explorer.hiro.so/txid/${txId}?chain=testnet`,
  address: (address: string) =>
    `https://explorer.hiro.so/address/${address}?chain=testnet`,
  contract: (contractId: string) =>
    `https://explorer.hiro.so/txid/${contractId}?chain=testnet`,
} as const;

// API Endpoints
export const API_URL = 'https://api.testnet.hiro.so';

// Network configuration for @stacks/connect
export const STACKS_NETWORK_CONFIG = {
  url: API_URL,
  network: NETWORK,
} as const;
