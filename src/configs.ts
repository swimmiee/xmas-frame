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
  env: "baseSepolia",
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
        XmasTree: "0xeD308f47A6246E90BE419b318F46aB32b31182Da",
        XMAS: "0xe8FFD02481D94E01d65DbF0887180637186944A5",
      },
    },
    baseSepolia: {
      chainId: BaseSepolia,
      rpcUrl: "https://sepolia.base.org",
      contracts: {
        XmasTree: "0x52d34B628264a6e06Ce7788a0166e7e266947558",
        XMAS: "0x946008428443a60b9142cBF2F3570DcB5bFcCff3",
        owner: "0x22E4Ee2e606716d9CCB0e987e77b3c9b10c8D45E",
        pair: "0xAFdfD52292D35Fd7BC8f8059128a591057Bc38a4",
        factory: "0x7Ae58f10f7849cA6F5fB71b7f45CB416c9204b1e",
        router: "0x1689E7B1F10000AE47eBfE339a4f69dECd19F602",
        WETH: "0x4200000000000000000000000000000000000006",
      },
    },
  },
} as const;
