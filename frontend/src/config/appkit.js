import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  bsc,
  avalanche,
  gnosis,
  linea,
  scroll,
  zksync,
  mantle,
  celo,
  fantom,
  blast,
} from "@reown/appkit/networks";

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;

if (!projectId) {
  console.warn("[appkit] VITE_WALLETCONNECT_PROJECT_ID is not set");
}

const networks = [
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  bsc,
  avalanche,
  gnosis,
  linea,
  scroll,
  zksync,
  mantle,
  celo,
  fantom,
  blast,
];

export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: false,
});

export const wagmiConfig = wagmiAdapter.wagmiConfig;

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata: {
    name: "Zyra",
    description: "Zyra — crowdfunding for foundations",
    url:
      typeof window !== "undefined"
        ? window.location.origin
        : "https://zyra.fund",
    icons: [],
  },
  features: {
    analytics: false,
    email: false,
    socials: false,
  },
  themeMode: "dark",
  themeVariables: {
    "--w3m-font-family": "inherit",
    "--w3m-accent": "#0A36F7",
    "--w3m-color-mix": "#010410",
    "--w3m-color-mix-strength": 12,
    "--w3m-border-radius-master": "2px",
    "--w3m-z-index": 1000,
  },
});
