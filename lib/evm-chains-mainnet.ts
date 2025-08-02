import { defineChain } from 'viem'

// You can keep this here or move it to a more general constants file
export const NATIVE_ADDRESS = `0x0000000000000000000000000000000000000000`

/**
 * Lisk Sepolia Testnet Chain Definition
 * * This object contains the configuration details for connecting to the
 * Lisk Sepolia testnet using viem.
 */
export const liskSepolia = defineChain({
    id: 4202,
    name: 'Lisk Sepolia',
    nativeCurrency: { decimals: 18, name: 'Lisk Sepolia Testnet', symbol: 'ETH' },
    rpcUrls: {
        // You can add multiple RPC URLs here for fallback purposes
        default: { http: ['https://rpc.sepolia-api.lisk.com'] },
        public: { http: ['https://rpc.sepolia-api.lisk.com'] },
    },
    blockExplorers: {
        default: { name: 'Lisk Sepolia Blockscout', url: 'https://sepolia-blockscout.lisk.com' },
    },
    testnet: true, // This flag indicates that it's a test network
})

// Array containing all the testnet chains for your application
export const allMainnetChains = [
    liskSepolia,
]
