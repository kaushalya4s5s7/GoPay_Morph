import { defineChain } from 'viem'
export const NATIVE_ADDRESS = `0x0000000000000000000000000000000000000000`

export const ethereumHolesky = defineChain({
    id: 17000,
    name: 'Ethereum Holesky',
    nativeCurrency: { decimals: 18, name: 'Holesky Ether', symbol: 'ETH' },
    rpcUrls: {
        default: { http: ['https://ethereum-holesky-rpc.publicnode.com', 'https://holesky.drpc.org'] },
    },
    blockExplorers: {
        default: { name: 'Holesky Etherscan', url: 'https://holesky.etherscan.io' },
    },
})

export const morphHolesky = defineChain({
    id: 2810,
    name: 'Morph Holesky',
    nativeCurrency: { decimals: 18, name: 'Ether', symbol: 'ETH' },
    rpcUrls: {
        default: { http: ['https://rpc-quicknode-holesky.morphl2.io', 'https://rpc-holesky.morphl2.io'] },
    },
    blockExplorers: {
        default: { name: 'Morph Holesky Testnet Explorer', url: 'https://explorer-holesky.morphl2.io/' },
    },
})







export const allMainnetChains = [
    ethereumHolesky,
    morphHolesky,
]

// Export ethereumHolesky as ethereum for compatibility
export const ethereum = ethereumHolesky;