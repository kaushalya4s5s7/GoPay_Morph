// Quick test to verify the Morph Rails SDK fix
import { morphRailsService } from './lib/morph-rails-simple';
import { ethers } from 'ethers';

export async function testMorphRailsIntegration() {
  console.log('🧪 Testing Morph Rails SDK Integration...');
  
  try {
    // Test token support
    const isUSDCSupported = await morphRailsService.isTokenSupported(
      '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238' // Sepolia USDC
    );
    console.log('✅ Token support check:', isUSDCSupported);
    
    // Test L2 token mapping
    const l2Token = await morphRailsService.getL2TokenAddress(
      '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238'
    );
    console.log('✅ L2 token mapping:', l2Token);
    
    // Test gas estimation
    const gasEstimate = await morphRailsService.getGasEstimate(
      'deposit',
      '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
      '1000000'
    );
    console.log('✅ Gas estimation:', gasEstimate);
    
    return {
      status: 'success',
      message: 'All Morph Rails functions working correctly!',
      results: { isUSDCSupported, l2Token, gasEstimate }
    };
  } catch (error) {
    console.error('❌ Test failed:', error);
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error',
      results: null
    };
  }
}
