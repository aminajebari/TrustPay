// utils/addressTruncator.ts

export function truncateAddress(address: string): string {
  if (!address) {
    throw new Error('Invalid address')
  }

  const truncated = `${address.slice(0, 4)}...${address.slice(-4)}`
  return truncated
}

export const getClusterURL = (cluster: string): string => {
  const clusterUrls: { [key: string]: string } = {
    'mainnet-beta': 'https://api.mainnet-beta.solana.com',
    testnet: 'https://api.testnet.solana.com',
    devnet: 'https://api.devnet.solana.com',
    localhost: 'http://127.0.0.1:8899',
  }

  return clusterUrls[cluster]
}

export const getCluster = (cluster: string): string => {
  const clusters: { [key: string]: string } = {
    'https://api.mainnet-beta.solana.com': 'mainnet-beta',
    'https://api.testnet.solana.com': 'testnet',
    'https://api.devnet.solana.com': 'devnet',
    'http://127.0.0.1:8899': 'custom',
  }

  return clusters[getClusterURL(cluster)]
}
