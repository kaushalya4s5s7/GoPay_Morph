import {
 liskSepolia   
} from "./evm-chains-mainnet";

// Define the Lisk Sepolia testnet configuration


// Export the native address constant
export const NATIVE_ADDRESS = '0x0000000000000000000000000000000000000000';


export const contractMainnetAddresses = {

    [liskSepolia.id]: '0x47C20dD1a64F91c0A3590f98266DEABE3536b0A4', // Replace with your actual contract address on Lisk Sepolia
};

// Token interface with optional priceFeed field
export interface Token {
    symbol: string;
    address: string;
    decimals: number;
    priceFeed?: string;
}

export const tokensPerMainnetChain: { [chainId: number]: Token[] } = {
     [liskSepolia.id]: [
        {
            symbol: 'ETH',
            address: '0x0000000000000000000000000000000000000000', // Native ETH
            decimals: 18,
            priceFeed: ''
        },
        {
            symbol: 'LSK',
            address: '0x8a21CF9Ba08Ae709D64Cb25AfAA951183EC9FF6D',
            decimals: 18,
            priceFeed: ''
        },
        {
            symbol: 'USDT',
            address: '0x2728DD8B45B788e26d12B13Db5A244e5403e7eda',
            decimals: 18,
            priceFeed: ''
        },
        {
            symbol: 'USDC.e',
            address: '0x0E82fDDAd51cc3ac12b69761C45bBCB9A2Bf3C83',
            decimals: 6,
            priceFeed: ''
        }
    ]

};