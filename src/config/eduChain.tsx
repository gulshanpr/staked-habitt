import { Chain } from "wagmi/chains";

export const OpenCampusCodexChain: Chain = {
  id: 656476,
  name: "OpenCampus Codex",
  nativeCurrency: {
    name: "OpenCampus Codex Token",
    symbol: "OCC",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://rpc.open-campus-codex.gelato.digital"] },
    public: { http: ["https://rpc.open-campus-codex.gelato.digital"] },
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://opencampus-codex.blockscout.com/",
    },
  },
  testnet: true,
};
