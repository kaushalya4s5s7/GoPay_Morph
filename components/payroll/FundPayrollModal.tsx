"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, DollarSign, ArrowDownUp, Loader, CheckCircle, AlertTriangle } from "lucide-react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { ethereum, morphHolesky } from '@/lib/evm-chains-mainnet';
import { tokensPerMainnetChain as tokens, Token } from '@/lib/evm-tokens-mainnet';
import { morphRailsService } from '@/lib/morph-rails-simple';
import { ethers } from 'ethers';
import { toast } from 'react-hot-toast';

interface FundPayrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFundingComplete?: (txHash: string, amount: string) => void;
}

const FundPayrollModal: React.FC<FundPayrollModalProps> = ({
  isOpen,
  onClose,
  onFundingComplete
}) => {
  const { address, isConnected, chainId } = useAccount();

  // UI state
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [amount, setAmount] = useState('');
  const [isDepositing, setIsDepositing] = useState(false);
  const [txHash, setTxHash] = useState<string>('');
  const [step, setStep] = useState<'input' | 'depositing' | 'success' | 'error'>('input');
  const [error, setError] = useState<string>('');

  // Initialize with USDC token
  useEffect(() => {
    const l1Tokens = tokens[ethereum.id] || [];
    const usdcToken = l1Tokens.find(token => token.symbol === 'USDC');
    if (usdcToken) {
      setSelectedToken(usdcToken);
    }
  }, []);

  const handleDeposit = async () => {
    if (!selectedToken || !amount || !isConnected || !window.ethereum) {
      setError('Please connect wallet and enter amount');
      return;
    }

    // Check if user is on the correct network (Holesky)
    if (chainId !== ethereum.id) {
      setError(`Please switch to ${ethereum.name} network to fund payroll`);
      return;
    }

    try {
      setIsDepositing(true);
      setStep('depositing');
      setError('');

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Verify signer is connected to the right network
      const network = await provider.getNetwork();
      if (Number(network.chainId) !== ethereum.id) {
        throw new Error(`Wrong network. Please connect to ${ethereum.name}`);
      }

      const amountWei = ethers.utils.parseUnits(amount, selectedToken.decimals);
      
      let depositTxHash: string | null;
      
      // Check if this is an ETH deposit
      if (selectedToken.address === '0x0000000000000000000000000000000000000000') {
        // For ETH deposits, check if user has enough ETH for amount + gas fees
        const gasFeesETH = ethers.utils.parseEther("0.003"); // Estimated L2 gas fees
        const totalRequired = amountWei.add(gasFeesETH);
        
        console.log('ETH Deposit:', {
          depositAmount: ethers.utils.formatEther(amountWei),
          gasFees: ethers.utils.formatEther(gasFeesETH),
          totalRequired: ethers.utils.formatEther(totalRequired)
        });
        
        // Use ETH deposit function
        depositTxHash = await morphRailsService.depositETH(
          amountWei.toString(),
          signer
        );
      } else {
        // Find corresponding L2 token for ERC20
        const l2Tokens = tokens[morphHolesky.id] || [];
        const l2Token = l2Tokens.find(token => token.symbol === selectedToken.symbol);
        
        if (!l2Token) {
          throw new Error(`No corresponding L2 token found for ${selectedToken.symbol}`);
        }

        // Use ERC20 deposit function
        depositTxHash = await morphRailsService.depositERC20(
          selectedToken.address,
          l2Token.address,
          amountWei.toString(),
          signer
        );
      }

      if (depositTxHash) {
        setTxHash(depositTxHash);
        setStep('success');
        toast.success('Deposit initiated successfully!');
        
        if (onFundingComplete) {
          onFundingComplete(depositTxHash, amount);
        }
      } else {
        throw new Error('Deposit transaction failed');
      }
    } catch (err: any) {
      console.error('Deposit error:', err);
      let errorMessage = 'Deposit failed';
      
      if (err.message?.includes('user rejected')) {
        errorMessage = 'Transaction cancelled by user';
      } else if (err.message?.includes('insufficient funds')) {
        errorMessage = 'Insufficient funds for transaction';
      } else if (err.message?.includes('Wrong network')) {
        errorMessage = err.message;
      } else if (err.message?.includes('cannot reconnect')) {
        errorMessage = 'Network connection error. Please try again.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      setStep('error');
      toast.error(errorMessage);
    } finally {
      setIsDepositing(false);
    }
  };

  const resetModal = () => {
    setStep('input');
    setAmount('');
    setTxHash('');
    setError('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md shadow-2xl border border-gray-200 dark:border-gray-800"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Fund Payroll Treasury
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {step === 'input' && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <ArrowDownUp className="w-5 h-5 text-blue-600" />
                <div className="text-sm">
                  <span className="text-blue-900 dark:text-blue-100">
                    Deposit from Ethereum L1 → Morph L2
                  </span>
                </div>
              </div>

              {/* Token Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Token
                </label>
                <select
                  value={selectedToken?.address || ''}
                  onChange={(e) => {
                    const token = tokens[ethereum.id]?.find(t => t.address === e.target.value);
                    setSelectedToken(token || null);
                  }}
                  className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  {tokens[ethereum.id]?.map((token) => (
                    <option key={token.address} value={token.address}>
                      {token.symbol}
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Amount
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white pr-16"
                  />
                  <span className="absolute right-3 top-3 text-gray-500 text-sm">
                    {selectedToken?.symbol}
                  </span>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span className="text-red-700 dark:text-red-300 text-sm">{error}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                
                {isConnected ? (
                  <button
                    onClick={handleDeposit}
                    disabled={!selectedToken || !amount || isDepositing}
                    className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {isDepositing ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin" />
                        Depositing...
                      </>
                    ) : (
                      <>
                        <DollarSign className="w-4 h-4" />
                        Deposit Funds
                      </>
                    )}
                  </button>
                ) : (
                  <ConnectButton.Custom>
                    {({ openConnectModal }) => (
                      <button
                        onClick={openConnectModal}
                        className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        Connect Wallet
                      </button>
                    )}
                  </ConnectButton.Custom>
                )}
              </div>
            </div>
          )}

          {step === 'depositing' && (
            <div className="text-center py-8">
              <Loader className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Processing Deposit
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Please confirm the transaction in your wallet...
              </p>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-600" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Deposit Successful!
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Funds are being transferred to Morph L2
              </p>
              {txHash && (
                <p className="text-xs text-blue-600 dark:text-blue-400 break-all mb-4">
                  TX: {txHash}
                </p>
              )}
              <button
                onClick={() => {
                  resetModal();
                  onClose();
                }}
                className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                Done
              </button>
            </div>
          )}

          {step === 'error' && (
            <div className="text-center py-8">
              <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-red-600" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Deposit Failed
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {error}
              </p>
              <button
                onClick={resetModal}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FundPayrollModal;
