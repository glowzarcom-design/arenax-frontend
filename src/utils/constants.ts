// src/utils/constants.ts

export const APP_NAME = 'ArenaX';
export const APP_DESCRIPTION = 'Compete in online gaming tournaments and win prizes';

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
export const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || '';

// Routes
export const ROUTES = {
  HOME: '/',
  SIGNUP: '/signup',
  LOGIN: '/login',
  TOURNAMENTS: '/tournaments',
  MATCH_DETAIL: '/tournaments/:id',
  LEADERBOARD: '/leaderboard',
  DASHBOARD: '/dashboard',
  WALLET: '/wallet',
  PROFILE: '/profile',
  MY_MATCHES: '/my-matches',
  WITHDRAW: '/withdraw',
  REFERRAL: '/referral',
  FAQ: '/faq',
  CONTACT: '/contact',
  HOW_IT_WORKS: '/how-it-works',
  ABOUT_US: '/about-us',
  PRIVACY_POLICY: '/privacy-policy',
  TERMS: '/terms-and-conditions',
  REFUND_POLICY: '/refund-policy',
  
  // Admin routes
  ADMIN_LOGIN: '/admin/login',
  ADMIN_DASHBOARD: '/admin',
  ADMIN_MATCHES: '/admin/matches',
  ADMIN_MATCH_DETAIL: '/admin/matches/:id',
  ADMIN_PAYMENTS: '/admin/payments',
  ADMIN_AFFILIATES: '/admin/affiliates',
  ADMIN_USERS: '/admin/users',
  ADMIN_ROLES: '/admin/roles',
  ADMIN_SETTINGS: '/admin/settings',
  ADMIN_MATCH_DETAIL: '/admin/matches/:id',
} as const;

// Referral Terms - YEH ADD HUA HAI
export const REFERRAL_TERMS = {
  MEMBER_BONUS: 10,
  WINNING_BONUS: 100,
  MIN_WITHDRAW: 500,
};
