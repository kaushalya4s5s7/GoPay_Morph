import {
    morphHolesky
} from "./evm-chains-mainnet";

// Export the native address constant
export const NATIVE_ADDRESS = '0x0000000000000000000000000000000000000000';

// add     [morphHolesky.id]:'0x5BbE08Df588207eDC29042EE62EE14142A81741B',

export const contractMainnetAddresses = {
    [morphHolesky.id]: '0x5BbE08Df588207eDC29042EE62EE14142A81741B',
    
};

// Token interface with optional priceFeed field
export interface Token {
    symbol: string;
    address: string;
    decimals: number;
    priceFeed?: string;
}

export const tokensPerMainnetChain: { [chainId: number]: Token[] } = {
    [morphHolesky.id]: [
        {
    symbol: 'ETH',
    address: '0x0000000000000000000000000000000000000000', // Native ETH
    decimals: 18,
    priceFeed: ''
},
{
    symbol: 'USDT',
    address: '0x9E12AD42c4E4d2acFBADE01a96446e48e6764B98',
    decimals: 6,
    priceFeed: ''
},
{
    symbol: 'USDC',
    address: '0xeA2610c28B4c5857689EAFa8b2116a617206d283',
    decimals: 6,
    priceFeed: ''
},
{
    symbol: 'DAI',
    address: '0xAa19d46626947C6E1E5F281aE835971579827DDC',
    decimals: 18,
    priceFeed: ''
},
{
    symbol: 'WETH',
    address: '0x5300000000000000000000000000000000000011',
    decimals: 18,
    priceFeed: ''
}

    ]
};
