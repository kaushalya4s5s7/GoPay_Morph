import {
    ethereum,
    morphHolesky
} from "./evm-chains-mainnet";

// Export the native address constant
export const NATIVE_ADDRESS = '0x0000000000000000000000000000000000000000';
  

export const contractMainnetAddresses = {
    [ethereum.id]: '0xEF471B0b6423be64604D62C27FB410bd0d9BBD94', // Deploy BulkPayroll on Holesky
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
    [ethereum.id]: [
        {
            symbol: 'ETH',
            address: '0x0000000000000000000000000000000000000000',
            decimals: 18,
            priceFeed: ''
        },
        {
            symbol: 'USDC',
            address: '0x18774be2de47F51AC914A2AC87DF9004c511FC53', // Holesky testnet USDC
            decimals: 6,
            priceFeed: ''
        },
        {
            symbol: 'USDT',
            address: '0x88B67B6fFa4Baf9e1dE7FB4fb4C73adC4DF63Ca4', // Holesky testnet USDT
            decimals: 6,
            priceFeed: ''
        },
        {
            symbol: 'DAI',
            address: '0xC2B8DeD57d0f7a12a5Ca6aC8F0BB9Fd27Aa4BfE5', // Holesky testnet DAI
            decimals: 18,
            priceFeed: ''
        },
        {
            symbol: 'WETH',
            address: '0x94373a4919B3240D86eA41593D5eBa789FEF3848', // Holesky testnet WETH
            decimals: 18,
            priceFeed: ''
        }
    ],
     [morphHolesky.id]: [
        {
            symbol: 'ETH',
            address: '0x0000000000000000000000000000000000000000', // Native ETH
            decimals: 18,
            priceFeed: ''
        },
        {
            symbol: 'USDT',
            address: '0x9E12AD42c4E4d2acFBADE01a96446e48e6764B98', // Official L2USDT
            decimals: 6,
            priceFeed: ''
        },
        {
            symbol: 'USDC',
            address: '0xeA2610c28B4c5857689EAFa8b2116a617206d283', // Official L2USDC
            decimals: 6,
            priceFeed: ''
        },
        {
            symbol: 'DAI',
            address: '0xAa19d46626947C6E1E5F281aE835971579827DDC', // Official L2DAI
            decimals: 18,
            priceFeed: ''
        },
        {
            symbol: 'WETH',
            address: '0x5300000000000000000000000000000000000011', // Official L2WETH
            decimals: 18,
            priceFeed: ''
        },
        {
            symbol: 'WBTC',
            address: '0x803DcE4D3f4Ae2e17AF6C51343040dEe320C149D', // Official L2WBTC
            decimals: 8,
            priceFeed: ''
        }
    ]

};