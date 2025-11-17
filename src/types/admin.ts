export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalTournaments: number;
  activeTournaments: number;
  totalRevenue: number;
  pendingWithdrawals: number;
  totalDeposits: number;
  totalPayouts: number;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  ign: string;
  freeFireId: string;
  depositBalance: number;
  winningsBalance: number;
  totalDeposit: number;
  totalWithdraw: number;
  matchesPlayed: number;
  status: 'active' | 'suspended' | 'banned';
  isBalanceBlocked: boolean;
  lastLoginIp?: string;
  deviceFingerprints?: string[];
  createdAt: string;
  lastLoginAt?: string;
}

export interface AdminTournamentForm {
  title: string;
  gameName: string;
  entryFee: number;
  prizePool: number;
  maxPlayers: number;
  startTime: string;
  description?: string;
  rules?: string;
}

export interface TeamMember {
  id: string;
  email: string;
  role: 'admin' | 'tournament_manager' | 'payment_processor' | 'viewer';
  status: 'active' | 'invited' | 'suspended';
  invitedAt: string;
  joinedAt?: string;
}

export interface TeamInvite {
  email: string;
  role: 'tournament_manager' | 'payment_processor' | 'viewer';
}
