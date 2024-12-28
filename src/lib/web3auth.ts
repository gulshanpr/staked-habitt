// web3auth.ts
import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";

// Web3Auth Client ID (Get it from Web3Auth Dashboard)
const clientId = "BAzA6iFqNA-UnWcrqDiKwWdJalYisHOF81vfovZQfm0LpbYlONapM4cISbZbep0VbzDsTUFz8DaAFyoZxYe2_ls";

// Chain Configuration
const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xa045c", // Sepolia Testnet
  rpcTarget: "https://rpc.open-campus-codex.gelato.digital", // Replace for production (Infura, Alchemy, etc.)
  displayName: "EDU Chain Testnet",
  blockExplorerUrl: "https://sepolia.etherscan.io",
  ticker: "EDU",
  tickerName: "EDU Chain",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

// Private Key Provider
const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

// Web3Auth Options
const web3AuthOptions: Web3AuthOptions = {
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
};

// Initialize Web3Auth
export const web3auth = new Web3Auth(web3AuthOptions);
