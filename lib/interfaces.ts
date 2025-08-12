export interface Window {
    ethereum?: {
        isMetaMask?: boolean;
        request: (request: { method: string; params?: any[] }) => Promise<any>;
        on: (eventName: string, callback: (...args: any[]) => void) => void;
        removeListener: (eventName: string, callback: (...args: any[]) => void) => void;
    };
}
export interface Employee {
    name: string;
    email: string;
    designation: string;
    salary: string;
    wallet: string;
    company: string;
}

export interface PayrollData {
    company: string;
    employees: Array<{
        wallet: string;
        amount: string;
    }>;
    totalAmount: string;
    tokenSymbol: string;
    chain: String;
    transactionHash?: string;
}

export interface Payment {
    id: string;
    amount: string;
    date: string;
    status: "completed" | "pending" | "failed";
}


export interface RegisterFormData {
    email: string;
    password: string;
    confirmPassword: string;
    company: string;
}

export interface LoginFormData {
    email: string;
    password: string;
}
export interface BuyFormData {
    wallet: string;
    tokenBought: string;
    chain: string; // Ensure this is a string, not a number
    amountToken: string;
    fiatType: string;
    amountFiat: string;
    exchangeRate: string;
    orderId: string;
}
export interface SellFormData {
    wallet: string;
    tokenSold: string;
    chain: string;
    amountToken: string;
    fiatType: string;
    amountFiat: string;
    exchangeRate: string;
    orderId: string;
    transactionHash: string;
    paymentMethod: string;
    paymentDetails: string;
}


export interface AuditLogData {
    company: string;
    action: string;
    details: Record<string, any>;
    entity: string;
}

export interface EmailRequest {
    email: string;
}

export interface EmailResponse {
    success: boolean;
    message: string;
    error?: string;
}

export interface NewsletterSubscriptionRequest extends EmailRequest { }
export interface WaitlistRegistrationRequest extends EmailRequest { }

export interface PaymentQR {
    id: string;
    name: string;
    image: string;
}

// Morph Rails specific interfaces
export interface MorphRailsPayrollData extends PayrollData {
    l1TxHash?: string; // L1 funding transaction
    l2TxHash?: string; // L2 bulk payment transaction  
    withdrawalHashes?: string[]; // L2->L1 withdrawal hashes
    finalizationHashes?: string[]; // L1 finalization hashes
    status: 'FUNDING' | 'PROCESSING' | 'WITHDRAWING' | 'FINALIZING' | 'COMPLETED' | 'FAILED';
}

export interface TreasuryOperation {
    id: string;
    type: 'DEPOSIT' | 'WITHDRAWAL';
    amount: string;
    token: string;
    txHash: string;
    timestamp: number;
    status: 'PENDING' | 'COMPLETED' | 'FAILED';
}