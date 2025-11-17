export interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  ign: string; // Non-editable after initial setup
  freeFireId: string; // Non-editable after initial setup
  referralCode: string;
  referredBy?: string;
  createdAt: string;
  lastLoginIp?: string;
  deviceFingerprints?: string[];
  isBalanceBlocked: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'upi' | 'bank';
  details: string;
  isLocked: boolean;
}

export interface UserPaymentMethods {
  upi1?: PaymentMethod;
  upi2?: PaymentMethod;
  bank?: PaymentMethod;
}

export interface UserStats {
  totalDeposit: number;
  totalWithdraw: number;
  totalWinnings: number;
  totalLosses: number;
  matchesPlayed: number;
  matchesWon: number;
}
