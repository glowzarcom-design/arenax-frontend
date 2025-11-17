export interface Tournament {
  id: string;
  title: string;
  gameName: string;
  entryFee: number;
  prizePool: number;
  maxPlayers: number;
  currentPlayers: number;
  startTime: string;
  status: 'upcoming' | 'live' | 'completed' | 'cancelled';
  description?: string;
  rules?: string;
  createdAt: string;
}

export interface Match extends Tournament {
  players: MatchPlayer[];
  results?: MatchResult[];
}

export interface MatchPlayer {
  userId: string;
  username: string;
  ign: string;
  avatar?: string;
  joinedAt: string;
}

export interface MatchResult {
  userId: string;
  username: string;
  ign: string;
  position: number;
  kills?: number;
  winningType: 'first_place' | 'kill_leader' | 'participation';
  prize: number;
}

export interface MatchHistory {
  matchId: string;
  matchTitle: string;
  gameName: string;
  entryFee: number;
  position?: number;
  prize: number;
  status: 'won' | 'lost' | 'pending';
  playedAt: string;
}
