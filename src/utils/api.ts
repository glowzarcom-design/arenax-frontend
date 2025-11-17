import { API_BASE_URL } from './constants';

// API Client utility
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem('authToken');

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'API request failed');
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const api = new ApiClient(API_BASE_URL);

// API endpoints placeholder - will be connected to backend
export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  signup: (data: unknown) => api.post('/auth/signup', data),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me'),
};

export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data: unknown) => api.put('/user/profile', data),
  getPaymentMethods: () => api.get('/user/payment-methods'),
  updatePaymentMethods: (data: unknown) => api.put('/user/payment-methods', data),
  getStats: () => api.get('/user/stats'),
};

export const walletAPI = {
  getBalance: () => api.get('/wallet/balance'),
  getTransactions: () => api.get('/wallet/transactions'),
  deposit: (amount: number) => api.post('/wallet/deposit', { amount }),
  withdraw: (data: unknown) => api.post('/wallet/withdraw', data),
};

export const tournamentsAPI = {
  getAll: () => api.get('/tournaments'),
  getById: (id: string) => api.get(`/tournaments/${id}`),
  join: (id: string) => api.post(`/tournaments/${id}/join`),
  getMyMatches: () => api.get('/tournaments/my-matches'),
  getResults: (id: string) => api.get(`/tournaments/${id}/results`),
};

export const referralAPI = {
  getStats: () => api.get('/referral/stats'),
  getTransactions: () => api.get('/referral/transactions'),
  getReferralCode: () => api.get('/referral/code'),
};

export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  getUsers: () => api.get('/admin/users'),
  getUserById: (id: string) => api.get(`/admin/users/${id}`),
  blockUserBalance: (id: string) => api.post(`/admin/users/${id}/block-balance`),
  unblockUserBalance: (id: string) => api.post(`/admin/users/${id}/unblock-balance`),
  
  createTournament: (data: unknown) => api.post('/admin/tournaments', data),
  updateTournament: (id: string, data: unknown) => api.put(`/admin/tournaments/${id}`, data),
  deleteTournament: (id: string) => api.delete(`/admin/tournaments/${id}`),
  
  getWithdrawals: () => api.get('/admin/withdrawals'),
  approveWithdrawal: (id: string) => api.post(`/admin/withdrawals/${id}/approve`),
  rejectWithdrawal: (id: string, reason: string) => api.post(`/admin/withdrawals/${id}/reject`, { reason }),
  
  inviteTeamMember: (data: unknown) => api.post('/admin/team/invite', data),
  getTeamMembers: () => api.get('/admin/team'),
  removeTeamMember: (id: string) => api.delete(`/admin/team/${id}`),
};
