# Payroll on Morph L2 with USD Payments & Morph Rails (Default to Ethereum L1)

---

## 1. Funding the Payroll Treasury

**Actors:** Payroll Admin / HR team  
**Where:** Ethereum L1 → Morph L2  

1. Company(employer) treasury holds **USDC** (or **USDT**) on Ethereum L1.  
2. Admin uses your payroll dApp UI → clicks **"Fund Payroll"**.  
3. Under the hood:  
   - `CrossChainMessenger.depositERC20()` sends USDC from L1 to L2 payroll wallet.  
   - SDK tracks status until **funds are confirmed on L2**.  
4. Once confirmed, the L2 payroll wallet now has enough USDC for salaries.

---

## 2. Running Payroll on Morph L2

**Actors:** Payroll Admin  
**Where:** Morph L2  

1. Admin uploads the **salary sheet** (list of employees + amounts).  
2. Your dApp calls the **bulk payment function** in your already-deployed payroll contract on Morph L2 (via ethers.js).  
3. For each employee:
   - The payroll contract automatically triggers `withdrawERC20()` to initiate transfer from L2 to L1.
   - SDK records and tracks withdrawal transactions for each payment.

---

## 3. Receiving Funds on Ethereum L1

**Actors:** Employee  
**Where:** Ethereum L1  

1. After the payroll transaction, the withdrawal process starts automatically for each employee.  
2. SDK waits for the **challenge period** (~7 days or Morph’s configured delay).  
3. Once ready, the payroll system (or an automated relayer) calls `finalizeMessage()` on L1.  
4. USDC appears in the employee’s **Ethereum wallet** without them needing to manually bridge funds.

---

## 4. Gas & UX Management

### **Gas Estimation**
- Before bulk payments, call `estimateTotalGasCost()` to know **L2 + L1 data costs** for the payroll batch (including withdrawals).

### **Tracking Status in UI**
Use `waitForMessageStatus()` to show for each employee:
- **Pending** → Withdrawal initiated on L2  
- **Proven** → Ready after challenge period  
- **Relayed** → Finalized on L1

### **One-Click UX for Admin**
- Entire payroll, including withdrawal to L1, is triggered from the admin interface.
- Employees automatically receive funds on Ethereum without interacting with Morph.

---

## 5. End-to-End Diagram

One-Click UX
Employees don’t need to visit a separate bridge UI — everything is inside your payroll dApp.

End-to-End Diagram (Text Form)


[Company USDC on Ethereum L1]
|
depositERC20() via Rails
↓
[Payroll Wallet on Morph L2]
|
bulkPay() salaries + auto withdrawERC20()
↓
[Employee Wallet on Ethereum L1]