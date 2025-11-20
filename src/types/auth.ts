// src/types/auth.ts

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  username: string;
  email: string;
  password: string;
  ign: string; // In-Game Name
  freeFireId: string; // Free Fire ID
}

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  ign: string;
  freeFireId: string;
  avatar?: string;
  role: 'user' | 'admin' | 'tournament_manager' | 'payment_processor';
  referralCode: string;
  createdAt: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  adminLogin?: (credentials: LoginCredentials) => Promise<void>;
  // --- YEH LINE CHANGE HUI HAI ---
  signup: (data: SignupData) => Promise<{ success: boolean; message: string; }>;
  logout: () => void;
}