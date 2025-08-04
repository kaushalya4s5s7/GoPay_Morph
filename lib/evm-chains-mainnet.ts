import { defineChain } from 'viem'
export const NATIVE_ADDRESS = `0x0000000000000000000000000000000000000000`



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
    morphHolesky,
   
]