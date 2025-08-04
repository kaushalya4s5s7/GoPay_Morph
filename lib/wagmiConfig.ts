import { getDefaultConfig, Chain } from '@rainbow-me/rainbowkit';
import { morph } from 'viem/chains';


const morphHolesky = {
  id: 2810,
  name: "morphHolesky",
  iconUrl: "https://d2j9klt7rsw34c.cloudfront.net/frontend/cms/logo/6fbf5560-d5ff-48d3-b28d-c3b723030dec.png", // optional
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: [
        "https://rpc-quicknode-holesky.morphl2.io",
        "https://rpc-holesky.morphl2.io"
      ]
    }
  },
  blockExplorers: {
    default: {
      name: "Morph Holesky Testnet Explorer",
      url: "https://explorer-holesky.morphl2.io/"
    }
  }
}as const satisfies Chain;





const config = getDefaultConfig({
    appName: 'GoPay',
    projectId: '23c5e43972b3775ee6ed4f74f3e76efb',
    chains: [morphHolesky],
});


export { config };