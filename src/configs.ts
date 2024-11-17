// Network	Chain ID
// Ethereum	eip155:1
// Arbitrum	eip155:42161
// Base	eip155:8453
// Degen	eip155:666666666
// Gnosis	eip155:100
// Optimism	eip155:10
// Zora	eip155:7777777
// Sepolia	eip155:11155111
// Arbitrum Sepolia	eip155:421614
// Base Sepolia	eip155:84532
// Optimism Sepolia	eip155:11155420

const Polygon = "eip155:137" as const;
const Sepolia = "eip155:11155111" as const;
const BaseSepolia = "eip155:84532" as const;

export const CONFIGS = {
  env: "base",
  bgCount: 3,
  ornCount: 18,
  envs: {
    sepolia: {
      chainId: Sepolia,
      rpcUrl: "https://rpc.sepolia.org",
    },
    polygon: {
      chainId: Polygon,
      rpcUrl: "https://polygon.llamarpc.com",
      contracts: {
        owner: "0x22E4Ee2e606716d9CCB0e987e77b3c9b10c8D45E",
        tree: "0xeD308f47A6246E90BE419b318F46aB32b31182Da",
        XMAS: "0xe8FFD02481D94E01d65DbF0887180637186944A5",
        nft: "0x77DA77d38d9263fC0b0830b2BBd46f8f18674d95",
      },
    },
    base: {
      chainId: BaseSepolia,
      rpcUrl: "https://sepolia.base.org",
      contracts: {
        owner: "0x22E4Ee2e606716d9CCB0e987e77b3c9b10c8D45E",
        tree: "0x7141A97ca4ECEb87550f828108E1852cC3BD6f04",
        XMAS: "0x26Da6a798BCC4595eAA46f7c17295384f56725d1",
        nft: "0x54F52bE0AE22e5Cc4a3B87C4992ba50e842df990",
      },
    },
  },

  orns: new Array(18).fill(0).map((_, i) => ({
    priceUnit: 1 + (i % 3),
    name: "O" + i,
  })),
} as const;
