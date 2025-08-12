# 🔧 Morph Bridge Error Resolution - Complete Fix

## 🚨 Error Analysis

### Original Error
```
Error: execution reverted (no data present; likely require(false) occurred)
Function Selector: 0x4af18eaf (depositERC20)
Parameters: [0x0000...0000, 0x0000...0000, 4000000000000000, 200000, 160]
```

## 🎯 Root Cause Identified

1. **Wrong Function Usage**: Using `depositERC20()` for ETH deposits (address 0x0000...0000)
2. **Bridge Contract Logic**: Morph bridge expects ETH deposits through `L1ETHGateway`, not `L1StandardERC20Gateway`
3. **Parameter Mismatch**: ETH deposits require different function signature and contract

## ✅ Complete Solution Applied

### 1. **Separated ETH and ERC20 Deposits**

**New ETH Deposit Function:**
```typescript
async depositETH(amount: string, signer: ethers.Signer): Promise<string | null>
```
- Uses `L1ETHGateway` contract: `0xcc3d455481967dc97346ef1771a112d7a14c8f12`
- Function: `depositETH(uint256 _amount, uint256 _gasLimit)`
- Sends ETH amount directly in transaction value

**Updated ERC20 Deposit Function:**
```typescript
async depositERC20(l1Token, l2Token, amount, signer): Promise<string | null>
```
- Validates that token is NOT ETH (address 0x0000...0000)
- Uses `L1StandardERC20Gateway` contract: `0xb26dafdb434ae93e3b8efde4f0193934955d86cd`
- Function: `depositERC20(address, address, uint256, uint256, bytes)`

### 2. **Updated Frontend Logic**

**FundPayrollModal.tsx Changes:**
```typescript
// Check if this is an ETH deposit
if (selectedToken.address === '0x0000000000000000000000000000000000000000') {
  // Use ETH deposit function
  depositTxHash = await morphRailsService.depositETH(amountWei.toString(), signer);
} else {
  // Use ERC20 deposit function
  depositTxHash = await morphRailsService.depositERC20(/*...*/);
}
```

### 3. **Bridge Contract Addresses**

**Added ETH Gateway Addresses:**
- L1ETHGateway: `0xcc3d455481967dc97346ef1771a112d7a14c8f12`
- L2ETHGateway: `0x5300000000000000000000000000000000000006`

### 4. **Token Configuration Fixed**

**Holesky Testnet Tokens (L1):**
- USDC: `0x18774be2de47F51AC914A2AC87DF9004c511FC53`
- USDT: `0x88B67B6fFa4Baf9e1dE7FB4fb4C73adC4DF63Ca4`
- DAI: `0xC2B8DeD57d0f7a12a5Ca6aC8F0BB9Fd27Aa4BfE5`
- WETH: `0x94373a4919B3240D86eA41593D5eBa789FEF3848`

## 🛠️ Files Modified

1. **`lib/morph-rails-simple.ts`**
   - ✅ Added `depositETH()` function
   - ✅ Updated `depositERC20()` to reject ETH
   - ✅ Added ETH gateway addresses
   - ✅ Fixed token mappings

2. **`components/payroll/FundPayrollModal.tsx`**
   - ✅ Added conditional logic for ETH vs ERC20
   - ✅ Calls correct function based on token type

3. **`lib/evm-tokens-mainnet.ts`**
   - ✅ Updated to use real Holesky testnet token addresses

## 🎯 Expected Behavior Now

### ETH Deposits
- Uses `L1ETHGateway.depositETH()`
- Sends ETH amount in transaction value
- No token approval needed

### ERC20 Deposits  
- Uses `L1StandardERC20Gateway.depositERC20()`
- Requires token approval first
- Uses testnet token addresses

## 🧪 Testing Steps

1. **ETH Deposit Test:**
   ```
   - Select ETH token
   - Enter amount (e.g., 0.001 ETH)
   - Should call depositETH() function
   - Should use L1ETHGateway contract
   ```

2. **ERC20 Deposit Test:**
   ```
   - Select USDC/USDT/DAI token
   - Enter amount  
   - Should call depositERC20() function
   - Should use L1StandardERC20Gateway contract
   ```

## ✅ Resolution Summary

The "execution reverted" error was caused by trying to deposit ETH using the ERC20 deposit function with zero addresses. The fix separates ETH and ERC20 deposits into different functions using the correct Morph bridge contracts for each type.

**Key Fix:** ETH deposits now use `L1ETHGateway` instead of `L1StandardERC20Gateway`
