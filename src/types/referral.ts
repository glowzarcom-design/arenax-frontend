export interface ReferralStats {
  totalReferrals: number;
  totalReferralDeposits: number;
  totalReferralWinnings: number;
  totalEarnings: number;
  pendingEarnings: number;
}

export interface ReferralTransaction {
  id: string;
  referredUserId: string;
  referredUsername: string;
  type: 'member_bonus' | 'winning_bonus';
  amount: number;
  status: 'pending' | 'credited';
  createdAt: string;
}

export interface ReferralTerms {
  memberBonus: number; // 10 Rupees per new member
  winningBonusPercentage: number; // 100 Rupees on referred user winning
  minimumWithdraw: number;
}
