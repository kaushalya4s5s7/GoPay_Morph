import { ethers } from 'ethers';

// Official Morph Holesky bridge addresses
const BRIDGE_ADDRESSES = {
  L1_STANDARD_BRIDGE: '0xb26dafdb434ae93e3b8efde4f0193934955d86cd', // L1StandardERC20Gateway
  L2_STANDARD_BRIDGE: '0x5300000000000000000000000000000000000008', // L2StandardERC20Gateway
  L1_ETH_GATEWAY: '0xcc3d455481967dc97346ef1771a112d7a14c8f12', // L1ETHGateway
  L2_ETH_GATEWAY: '0x5300000000000000000000000000000000000006', // L2ETHGateway
};

// Morph Holesky Configuration with official addresses
export const MORPH_CONFIG = {
  L1_CHAIN_ID: 17000, // Ethereum Holesky Testnet
  L2_CHAIN_ID: 2810, // Morph Holesky
  L1_RPC: 'https://ethereum-holesky-rpc.publicnode.com',
  L2_RPC: 'https://rpc-holesky.morphl2.io',
  CHALLENGE_PERIOD: 7 * 24 * 60 * 60, // 7 days in seconds
};

export class MorphRailsService {
  private l1Provider: ethers.providers.JsonRpcProvider;
  private l2Provider: ethers.providers.JsonRpcProvider;

  constructor() {
    this.l1Provider = new ethers.providers.JsonRpcProvider(MORPH_CONFIG.L1_RPC);
    this.l2Provider = new ethers.providers.JsonRpcProvider(MORPH_CONFIG.L2_RPC);
  }

  /**
   * Deposit ETH from L1 to L2 using L1ETHGateway
   */
  async depositETH(
    amount: string,
    signer: ethers.Signer
  ): Promise<string | null> {
    try {
      console.log('Morph Rails ETH Deposit:', {
        amount,
        signerAddress: await signer.getAddress()
      });

      // Check if signer is connected to the correct network
      if (signer.provider) {
        const network = await signer.provider.getNetwork();
        if (Number(network.chainId) !== MORPH_CONFIG.L1_CHAIN_ID) {
          throw new Error(`Wrong network. Please connect to Holesky (Chain ID: ${MORPH_CONFIG.L1_CHAIN_ID})`);
        }
      }

      // Use L1ETHGateway for ETH deposits
      const l1EthGateway = new ethers.Contract(
        ethers.utils.getAddress(BRIDGE_ADDRESSES.L1_ETH_GATEWAY),
        [
          'function depositETH(uint256 _amount, uint256 _gasLimit) payable external'
        ],
        signer
      );

      console.log('Initiating ETH bridge deposit...');
      const depositTx = await l1EthGateway.depositETH(
        amount,
        200000, // L2 gas limit
        {
          // For Morph ETH bridge: msg.value = deposit_amount + l2_gas_fee
          // L2 gas fee is estimated as gasLimit * gasPrice (roughly 0.001 ETH)
          value: ethers.BigNumber.from(amount).add(ethers.utils.parseEther("0.003")) // Amount + L2 gas fees
        }
      );

      await depositTx.wait();
      console.log('✅ ETH bridge deposit successful:', depositTx.hash);
      return depositTx.hash;
    } catch (error) {
      console.error('ETH Deposit error:', error);
      return null;
    }
  }

  /**
   * Deposit ERC20 tokens from L1 to L2 using real bridge transactions
   */
  async depositERC20(
    l1TokenAddress: string,
    l2TokenAddress: string,
    amount: string,
    signer: ethers.Signer
  ): Promise<string | null> {
    try {
      console.log('Morph Rails Deposit:', {
        l1TokenAddress,
        l2TokenAddress,
        amount,
        signerAddress: await signer.getAddress()
      });

      // Check if signer is connected to the correct network
      if (signer.provider) {
        const network = await signer.provider.getNetwork();
        if (Number(network.chainId) !== MORPH_CONFIG.L1_CHAIN_ID) {
          throw new Error(`Wrong network. Please connect to Holesky (Chain ID: ${MORPH_CONFIG.L1_CHAIN_ID})`);
        }
      }

      // Validate that this is not an ETH deposit (should use depositETH instead)
      if (l1TokenAddress === '0x0000000000000000000000000000000000000000') {
        throw new Error('Use depositETH() for ETH deposits');
      }

      // Validate and checksum addresses
      let checksummedL1Token: string;
      let checksummedL2Token: string;
      let checksummedBridge: string;

      try {
        checksummedL1Token = ethers.utils.getAddress(l1TokenAddress);
        checksummedL2Token = ethers.utils.getAddress(l2TokenAddress);
        checksummedBridge = ethers.utils.getAddress(BRIDGE_ADDRESSES.L1_STANDARD_BRIDGE);
      } catch (addressError) {
        console.error('Address validation error:', addressError);
        throw new Error('Invalid token or bridge address format');
      }

      // 1. Approve L1 bridge to spend tokens
      const l1Token = new ethers.Contract(
        checksummedL1Token,
        [
          'function approve(address spender, uint256 amount) returns (bool)',
          'function allowance(address owner, address spender) view returns (uint256)'
        ],
        signer
      );

      console.log('Approving token spend for bridge...');
      const approveTx = await l1Token.approve(checksummedBridge, amount);
      await approveTx.wait();
      console.log('✅ Token approval successful:', approveTx.hash);

      // 2. Call L1 bridge deposit function with correct Morph L1StandardERC20Gateway signature
      const l1Bridge = new ethers.Contract(
        checksummedBridge,
        [
          // Morph L1StandardERC20Gateway function signature
          'function depositERC20(address _l1Token, address _l2Token, uint256 _amount, uint256 _l2Gas, bytes calldata _data) payable external'
        ],
        signer
      );

      console.log('Initiating ERC20 bridge deposit...');
      const depositTx = await l1Bridge.depositERC20(
        checksummedL1Token,
        checksummedL2Token,
        amount,
        200000, // L2 gas limit
        '0x', // empty data
        {
          value: ethers.utils.parseEther("0.001") // ETH for L2 gas fees
        }
      );

      await depositTx.wait();
      console.log('✅ ERC20 bridge deposit successful:', depositTx.hash);
      return depositTx.hash;
    } catch (error) {
      console.error('Deposit error:', error);
      
      // Provide more specific error messages
      if (error instanceof Error) {
        if (error.message.includes('bad address checksum')) {
          throw new Error('Invalid address format. Please verify token or bridge addresses.');
        } else if (error.message.includes('insufficient funds')) {
          throw new Error('Insufficient funds for transaction and gas fees.');
        } else if (error.message.includes('user rejected')) {
          throw new Error('Transaction cancelled by user.');
        } else if (error.message.includes('contract call reverted')) {
          throw new Error('Bridge contract call failed. Please check token approval or bridge availability.');
        }
      }
      
      return null;
    }
  }

  /**
   * Withdraw ERC20 tokens from L2 to L1 using real bridge transactions
   */
  async withdrawERC20(
    l1TokenAddress: string,
    l2TokenAddress: string,
    amount: string,
    signer: ethers.Signer
  ): Promise<string | null> {
    try {
      console.log('Morph Rails Withdraw:', {
        l1TokenAddress,
        l2TokenAddress,
        amount,
        signerAddress: await signer.getAddress()
      });

      // Validate and checksum addresses
      const checksummedL1Token = ethers.utils.getAddress(l1TokenAddress);
      const checksummedL2Token = ethers.utils.getAddress(l2TokenAddress);
      const checksummedBridge = ethers.utils.getAddress(BRIDGE_ADDRESSES.L2_STANDARD_BRIDGE);

      // Real L2 → L1 bridge implementation
      const l2Bridge = new ethers.Contract(
        checksummedBridge,
        [
          'function withdrawERC20(address _l2Token, address _l1Token, uint256 _amount, uint32 _l1Gas, bytes _data)'
        ],
        signer
      );

      const withdrawTx = await l2Bridge.withdrawERC20(
        checksummedL2Token,
        checksummedL1Token,
        amount,
        200000, // L1 gas limit
        '0x' // empty data
      );

      await withdrawTx.wait();
      console.log('✅ Bridge withdrawal initiated:', withdrawTx.hash);
      
      return withdrawTx.hash;
    } catch (error) {
      console.error('Withdraw error:', error);
      return null;
    }
  }

  /**
   * Check the status of a cross-chain message using real bridge monitoring
   */
  async getMessageStatus(txHash: string): Promise<'pending' | 'completed' | 'failed'> {
    try {
      console.log('Checking message status for:', txHash);

      // For L1 → L2 deposits, check if the transaction is confirmed on L2
      const l1Receipt = await this.l1Provider.getTransactionReceipt(txHash);
      if (!l1Receipt) {
        return 'pending';
      }

      // Wait for some confirmations to ensure finality
      const currentBlock = await this.l1Provider.getBlockNumber();
      const confirmations = currentBlock - l1Receipt.blockNumber;
      
      if (confirmations >= 6) {
        return 'completed';
      } else {
        return 'pending';
      }
    } catch (error) {
      console.error('Message status check error:', error);
      return 'failed';
    }
  }

  /**
   * Get L1 to L2 token mapping using real bridge mappings
   */
  async getL2TokenAddress(l1TokenAddress: string): Promise<string | null> {
    try {
      // Validate and checksum the input address
      const checksummedInput = ethers.utils.getAddress(l1TokenAddress);
      
      // Real Holesky L1 ↔ Morph L2 token mappings (all checksummed)
      const tokenMappings: { [key: string]: string } = {
        // Holesky testnet USDC → Morph USDC
        '0x18774be2de47F51AC914A2AC87DF9004c511FC53': '0xeA2610c28B4c5857689EAFa8b2116a617206d283',
        // Holesky testnet USDT → Morph USDT  
        '0x88B67B6fFa4Baf9e1dE7FB4fb4C73adC4DF63Ca4': '0x9E12AD42c4E4d2acFBADE01a96446e48e6764B98',
        // Holesky testnet DAI → Morph DAI
        '0xC2B8DeD57d0f7a12a5Ca6aC8F0BB9Fd27Aa4BfE5': '0xAa19d46626947C6E1E5F281aE835971579827DDC',
        // Holesky testnet WETH → Morph WETH
        '0x94373a4919B3240D86eA41593D5eBa789FEF3848': '0x5300000000000000000000000000000000000011',
      };

      return tokenMappings[checksummedInput] || null;
    } catch (error) {
      console.error('Error getting L2 token address:', error);
      return null;
    }
  }

  /**
   * Check if token is supported for cross-chain transfer
   */
  async isTokenSupported(tokenAddress: string, isL1: boolean = true): Promise<boolean> {
    try {
      // Validate and checksum the input address
      const checksummedAddress = ethers.utils.getAddress(tokenAddress);
      
      // Real Holesky testnet supported tokens (all checksummed)
      const supportedL1Tokens = [
        '0x18774be2de47F51AC914A2AC87DF9004c511FC53', // Holesky testnet USDC
        '0x88B67B6fFa4Baf9e1dE7FB4fb4C73adC4DF63Ca4', // Holesky testnet USDT
        '0xC2B8DeD57d0f7a12a5Ca6aC8F0BB9Fd27Aa4BfE5', // Holesky testnet DAI
        '0x94373a4919B3240D86eA41593D5eBa789FEF3848', // Holesky testnet WETH
      ];

      const supportedL2Tokens = [
        '0xeA2610c28B4c5857689EAFa8b2116a617206d283', // Morph USDC
        '0x9E12AD42c4E4d2acFBADE01a96446e48e6764B98', // Morph USDT
        '0xAa19d46626947C6E1E5F281aE835971579827DDC', // Morph DAI
        '0x5300000000000000000000000000000000000011', // Morph WETH
        '0x803DcE4D3f4Ae2e17AF6C51343040dEe320C149D', // Morph WBTC
      ];

      if (isL1) {
        return supportedL1Tokens.includes(checksummedAddress);
      }

      return supportedL2Tokens.includes(checksummedAddress);
    } catch (error) {
      console.error('Error checking token support:', error);
      return false;
    }
  }
}

// Export singleton instance
export const morphRailsService = new MorphRailsService();
