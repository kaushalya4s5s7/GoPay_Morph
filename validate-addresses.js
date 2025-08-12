// Quick validation test for Morph bridge addresses
import { ethers } from 'ethers';

const bridgeAddresses = {
  L1_STANDARD_BRIDGE: '0x6f2C72e9aE81a62b6d3Bb7F4A3F9dB1e3E8E83ff',
  L2_STANDARD_BRIDGE: '0x4200000000000000000000000000000000000010',
};

console.log('🔍 Validating Morph bridge addresses...');

try {
  const checksummedL1Bridge = ethers.getAddress(bridgeAddresses.L1_STANDARD_BRIDGE);
  const checksummedL2Bridge = ethers.getAddress(bridgeAddresses.L2_STANDARD_BRIDGE);
  
  console.log('✅ L1 Bridge (Sepolia):', checksummedL1Bridge);
  console.log('✅ L2 Bridge (Morph):', checksummedL2Bridge);
  
  console.log('\n🎯 Address validation successful! Both addresses have valid checksums.');
} catch (error) {
  console.error('❌ Address validation failed:', error);
}

// Test Sepolia token addresses
const sepoliaTokens = {
  USDC: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
  USDT: '0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0',
  LINK: '0x779877A7B0D9E8603169DdbD7836e478b4624789',
};

console.log('\n🪙 Validating Sepolia token addresses...');
Object.entries(sepoliaTokens).forEach(([symbol, address]) => {
  try {
    const checksummed = ethers.getAddress(address);
    console.log(`✅ ${symbol}:`, checksummed);
  } catch (error) {
    console.error(`❌ ${symbol} validation failed:`, error);
  }
});

export { bridgeAddresses };
