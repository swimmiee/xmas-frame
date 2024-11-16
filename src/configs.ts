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
const BaseSepolia = "eip155:84532" as const;

export const CONFIGS = {
  env: "base",
  bgCount: 3,
  ornCount: 12,
  envs: {
    sepolia: {
      chainId: Sepolia,
      rpcUrl: "https://rpc.sepolia.org",
    },
    base: {
      chainId: BaseSepolia,
      rpcUrl: "https://sepolia.base.org",
      contracts: {
        owner: "0x22E4Ee2e606716d9CCB0e987e77b3c9b10c8D45E",
        tree: "0x4cBE57086251b5Af94AF65a045De63e3b2A26396",
        XMAS: "0xDeCA3DcA1F1e75d6c5e8C57aF03B6AaD379229C2",
        nft: "0xdEa7A0550528a163929840c2c810Da4F98933EEE",
      },
    },
  },

  orns: new Array(12).fill(0).map((_, i) => ({
    priceUnit: 1 + (i % 3),
    name: "O" + i,
  })),
} as const;
