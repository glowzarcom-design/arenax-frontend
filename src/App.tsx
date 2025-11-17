// src/App.tsx

import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { MainLayout } from "./components/layout/MainLayout";
import { AdminLayout } from "./components/layout/AdminLayout";
import { ROUTES } from "./utils/constants";
import NotFound from "./pages/NotFound";

// Lazy load all pages for performance
const HomePage = lazy(() => import("./pages/HomePage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const TournamentsPage = lazy(() => import("./pages/TournamentsPage"));
const TournamentDetailPage = lazy(() => import("./pages/TournamentDetailPage")); // <-- YEH LINE ADD HUI HAI
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const ReferralPage = lazy(() => import("./pages/ReferralPage"));
const FaqPage = lazy(() => import("./pages/FaqPage"));
const HowItWorksPage = lazy(() => import("./pages/HowItWorksPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsAndConditionsPage = lazy(() => import("./pages/TermsAndConditionsPage"));
const RefundPolicyPage = lazy(() => import("./pages/RefundPolicyPage"));
const LeaderboardPage = lazy(() => import("./pages/LeaderboardPage"));
const WalletPage = lazy(() => import("./pages/WalletPage"));
const WithdrawPage = lazy(() => import("./pages/WithdrawPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AboutUsPage = lazy(() => import("./pages/AboutUsPage"));

// Admin pages
const AdminMatchDetailPage = lazy(() => import("./pages/admin/AdminMatchDetailPage"));
const AdminLoginPage = lazy(() => import("./pages/admin/AdminLoginPage"));
const AdminDashboardPage = lazy(() => import("./pages/admin/AdminDashboardPage"));
const AdminMatchesPage = lazy(() => import("./pages/admin/AdminMatchesPage"));
const AdminUsersPage = lazy(() => import("./pages/admin/AdminUsersPage"));
const AdminRolesPage = lazy(() => import("./pages/admin/AdminRolesPage"));
const AdminPaymentsPage = lazy(() => import("./pages/admin/AdminPaymentsPage"));
const AdminSettingsPage = lazy(() => import("./pages/admin/AdminSettingsPage"));
const AdminAffiliatesPage = lazy(() => import("./pages/admin/AdminAffiliatesPage"));

const queryClient = new QueryClient();

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <div className="animate-pulse-neon text-primary text-2xl font-bold">Loading...</div>
  </div>
);

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) return <PageLoader />;
  if (!isAuthenticated) return <Navigate to={ROUTES.LOGIN} replace />;
  
  return <>{children}</>;
};

// Admin route wrapper
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  
  if (isLoading) return <PageLoader />;
  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to={ROUTES.ADMIN_LOGIN} replace />;
  }
  
  return <>{children}</>;
};

const AppContent = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public routes with MainLayout */}
        <Route path={ROUTES.HOME} element={<MainLayout isAuthenticated={isAuthenticated} onLogout={logout}><HomePage /></MainLayout>} />
        <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.TOURNAMENTS} element={<MainLayout isAuthenticated={isAuthenticated} onLogout={logout}><TournamentsPage /></MainLayout>} />
        <Route path={ROUTES.MATCH_DETAIL} element={<MainLayout isAuthenticated={isAuthenticated} onLogout={logout}><TournamentDetailPage /></MainLayout>} /> {/* <-- YEH LINE ADD HUI HAI */}
        <Route path={ROUTES.LEADERBOARD} element={<MainLayout isAuthenticated={isAuthenticated} onLogout={logout}><LeaderboardPage /></MainLayout>} />
        <Route path={ROUTES.FAQ} element={<MainLayout isAuthenticated={isAuthenticated} onLogout={logout}><FaqPage /></MainLayout>} />
        <Route path={ROUTES.HOW_IT_WORKS} element={<MainLayout isAuthenticated={isAuthenticated} onLogout={logout}><HowItWorksPage /></MainLayout>} />
        <Route path={ROUTES.PRIVACY_POLICY} element={<MainLayout isAuthenticated={isAuthenticated} onLogout={logout}><PrivacyPolicyPage /></MainLayout>} />
        <Route path={ROUTES.TERMS} element={<MainLayout isAuthenticated={isAuthenticated} onLogout={logout}><TermsAndConditionsPage /></MainLayout>} />
        <Route path={ROUTES.REFUND_POLICY} element={<MainLayout isAuthenticated={isAuthenticated} onLogout={logout}><RefundPolicyPage /></MainLayout>} />
        <Route path={ROUTES.CONTACT} element={<MainLayout isAuthenticated={isAuthenticated} onLogout={logout}><ContactPage /></MainLayout>} />
        <Route path={ROUTES.ABOUT_US} element={<MainLayout isAuthenticated={isAuthenticated} onLogout={logout}><AboutUsPage /></MainLayout>} />

        {/* Protected user routes */}
        <Route path={ROUTES.DASHBOARD} element={<ProtectedRoute><MainLayout isAuthenticated={isAuthenticated} onLogout={logout}><DashboardPage /></MainLayout></ProtectedRoute>} />
        <Route path={ROUTES.PROFILE} element={<ProtectedRoute><MainLayout isAuthenticated={isAuthenticated} onLogout={logout}><ProfilePage /></MainLayout></ProtectedRoute>} />
        <Route path={ROUTES.REFERRAL} element={<ProtectedRoute><MainLayout isAuthenticated={isAuthenticated} onLogout={logout}><ReferralPage /></MainLayout></ProtectedRoute>} />
        <Route path={ROUTES.WALLET} element={<ProtectedRoute><MainLayout isAuthenticated={isAuthenticated} onLogout={logout}><WalletPage /></MainLayout></ProtectedRoute>} />
        <Route path={ROUTES.WITHDRAW} element={<ProtectedRoute><MainLayout isAuthenticated={isAuthenticated} onLogout={logout}><WithdrawPage /></MainLayout></ProtectedRoute>} />

        {/* Admin Login Route */}
        <Route path={ROUTES.ADMIN_LOGIN} element={<AdminLoginPage />} />

        {/* Protected admin routes */}
        <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminRoute><AdminLayout onLogout={logout}><AdminDashboardPage /></AdminLayout></AdminRoute>} />
        <Route path={ROUTES.ADMIN_MATCHES} element={<AdminRoute><AdminLayout onLogout={logout}><AdminMatchesPage /></AdminLayout></AdminRoute>} />
        <Route path={ROUTES.ADMIN_USERS} element={<AdminRoute><AdminLayout onLogout={logout}><AdminUsersPage /></AdminLayout></AdminRoute>} />
        <Route path={ROUTES.ADMIN_ROLES} element={<AdminRoute><AdminLayout onLogout={logout}><AdminRolesPage /></AdminLayout></AdminRoute>} />
        <Route path={ROUTES.ADMIN_PAYMENTS} element={<AdminRoute><AdminLayout onLogout={logout}><AdminPaymentsPage /></AdminLayout></AdminRoute>} />
        <Route path={ROUTES.ADMIN_AFFILIATES} element={<AdminRoute><AdminLayout onLogout={logout}><AdminAffiliatesPage /></AdminLayout></AdminRoute>} />
        <Route path={ROUTES.ADMIN_SETTINGS} element={<AdminRoute><AdminLayout onLogout={logout}><AdminSettingsPage /></AdminLayout></AdminRoute>} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
