export interface WalletBalance {
  deposit: number;
  winnings: number;
  total: number;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'match_fee' | 'match_win' | 'referral_bonus';
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface WithdrawRequest {
  amount: number;
  paymentMethod: 'upi1' | 'upi2' | 'bank';
}

export interface WithdrawHistory {
  id: string;
  amount: number;
  paymentMethod: string;
  status: 'pending' | 'approved' | 'rejected' | 'processed';
  requestedAt: string;
  processedAt?: string;
  adminNote?: string;
}
