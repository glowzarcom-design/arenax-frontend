// src/components/layout/AdminLayout.tsx

import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Trophy, 
  Users, 
  CreditCard,
  Share2, // <-- YEH ICON IMPORT HUA HAI
  UserCog, 
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import { LogoDisplay } from '../ui/LogoDisplay';
import { Button } from '../ui/button';
import { ROUTES } from '@/utils/constants';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
  onLogout?: () => void;
}

export const AdminLayout = ({ children, onLogout }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const sidebarLinks = [
    { icon: LayoutDashboard, label: 'Dashboard', to: ROUTES.ADMIN_DASHBOARD },
    { icon: Trophy, label: 'Tournaments', to: ROUTES.ADMIN_MATCHES },
    { icon: Users, label: 'Users', to: ROUTES.ADMIN_USERS },
    { icon: CreditCard, label: 'Payments', to: ROUTES.ADMIN_PAYMENTS },
    { icon: Share2, label: 'Affiliates', to: ROUTES.ADMIN_AFFILIATES }, // <-- YEH LINE ADD HUI HAI
    { icon: UserCog, label: 'Team', to: ROUTES.ADMIN_ROLES },
    { icon: Settings, label: 'Settings', to: ROUTES.ADMIN_SETTINGS },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background-elevated border-b border-border">
        <div className="flex items-center justify-between px-4 h-16">
          <LogoDisplay size="sm" />
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-foreground"
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      <div className="flex pt-16 lg:pt-0">
        {/* Sidebar */}
        <aside
          className={cn(
            'fixed lg:sticky top-16 lg:top-0 left-0 z-40 w-64 h-[calc(100vh-4rem)] lg:h-screen',
            'bg-background-elevated border-r border-border transition-transform duration-300',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          )}
        >
          <div className="flex flex-col h-full p-4">
            {/* Logo - Desktop only */}
            <div className="hidden lg:block mb-8">
              <LogoDisplay size="md" />
              <p className="text-xs text-muted-foreground mt-2">Admin Panel</p>
            </div>

            {/* Navigation */}
            <nav className="flex-grow space-y-2">
              {sidebarLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-lg transition-all',
                      isActive
                        ? 'bg-primary/10 text-primary shadow-glow-primary'
                        : 'text-muted-foreground hover:bg-card hover:text-foreground'
                    )}
                  >
                    <link.icon className="h-5 w-5" />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Logout Button */}
            <div className="pt-4 border-t border-border">
              <Button
                variant="ghost"
                onClick={onLogout}
                className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};