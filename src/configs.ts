// Network	Chain ID
// Ethereum	eip155:1
// Arbitrum	eip155:42161
// Base	eip155:8453
// Degen	eip155:666666666
// Gnosis	eip155:100
// Optimism	eip155:10
// Zora	eip155:7777777
// Polygon	eip155:137
// Sepolia	eip155:11155111
// Arbitrum Sepolia	eip155:421614
// Base Sepolia	eip155:84532
// Optimism Sepolia	eip155:11155420

const Sepolia = "eip155:11155111" as const;

export const CONFIGS = {
  chainId: Sepolia,
  bgCount: 1,
} as const;
