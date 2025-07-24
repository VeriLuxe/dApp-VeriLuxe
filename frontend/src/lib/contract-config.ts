import { Networks } from '@stellar/stellar-sdk';

export interface ContractConfig {
  contractAddress: string;
  networkPassphrase: string;
  rpcUrl: string;
  network: 'testnet' | 'futurenet' | 'mainnet';
}

// Default configuration for testnet
export const defaultConfig: ContractConfig = {
  contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '',
  networkPassphrase: process.env.NEXT_PUBLIC_NETWORK_PASSPHRASE || Networks.TESTNET,
  rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || 'https://soroban-testnet.stellar.org',
  network: (process.env.NEXT_PUBLIC_NETWORK as 'testnet' | 'futurenet' | 'mainnet') || 'testnet'
};

// Network configurations
export const networkConfigs = {
  testnet: {
    networkPassphrase: Networks.TESTNET,
    rpcUrl: 'https://soroban-testnet.stellar.org',
  },
  futurenet: {
    networkPassphrase: Networks.FUTURENET,
    rpcUrl: 'https://rpc-futurenet.stellar.org:443',
  },
  mainnet: {
    networkPassphrase: Networks.PUBLIC,
    rpcUrl: 'https://mainnet.sorobanrpc.com',
  }
};

export function getNetworkConfig(network: 'testnet' | 'futurenet' | 'mainnet') {
  return networkConfigs[network];
}