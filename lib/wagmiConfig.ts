import { getDefaultConfig, Chain } from '@rainbow-me/rainbowkit';

/**
 * Configuration object for the Lisk Sepolia testnet.
 * This object provides all the necessary details for RainbowKit to connect
 * to the Lisk Sepolia network.
 */
const liskSepolia = {
  id: 4202,
  name: "Lisk Sepolia",
  iconUrl: "https://lisk.com/wp-content/uploads/2024/11/cropped-Logo-White-on-Black-512-32x32.png", // Official Lisk logo
  nativeCurrency: {
    name: "Sepolia Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: [
        "https://rpc.sepolia-api.lisk.com"
      ]
    },
     public: {
      http: [
        "https://rpc.sepolia-api.lisk.com"
      ]
    }
  },
  blockExplorers: {
    default: {
      name: "Lisk Sepolia Blockscout",
      url: "https://sepolia-blockscout.lisk.com"
    }
  },
  testnet: true, // It's a testnet
} as const satisfies Chain;


/**
 * RainbowKit configuration.
 * This sets up the default configuration for your dApp, specifying the app name,
 * a WalletConnect project ID, and the blockchain networks you want to support.
 */
const config = getDefaultConfig({
    appName: 'GoPay',
    projectId: '23c5e43972b3775ee6ed4f74f3e76efb', // Your WalletConnect Project ID
    chains: [liskSepolia], // Set Lisk Sepolia as the supported chain
});


export { config };