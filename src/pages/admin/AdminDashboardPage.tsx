// src/pages/admin/AdminDashboardPage.tsx

import { useState, useEffect } from 'react';
import { Users, Trophy, DollarSign, TrendingUp, TrendingDown, Activity, PlusCircle, CreditCard, UserCog } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { NeonText } from '@/components/ui/NeonText';
import { formatCurrency } from '@/utils/helpers';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/utils/constants';
import { Skeleton } from '@/components/ui/skeleton'; // Loading ke liye Skeleton import karenge

// AdminStats ka type define karenge
interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalTournaments: number;
  activeTournaments: number;
  totalRevenue: number;
  pendingWithdrawals: number;
  totalDeposits: number;
  totalPayouts: number;
}

// RecentActivity ka type define karenge
type RecentActivityItem = {
  type: 'user_signup' | 'tournament_join' | 'withdrawal' | 'deposit';
  user: string;
  time: string;
  tournament?: string;
  amount?: number;
};

export default function AdminDashboardPage() {
  // Dummy data ko state se replace karenge
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Yahan par future me Supabase se data fetch karne ka code aayega
    // Abhi ke liye, hum 2 second ka loading dikha kar sab zero set kar denge
    const timer = setTimeout(() => {
      setStats({
        totalUsers: 0,
        activeUsers: 0,
        totalTournaments: 0,
        activeTournaments: 0,
        totalRevenue: 0,
        pendingWithdrawals: 0,
        totalDeposits: 0,
        totalPayouts: 0,
      });
      setRecentActivity([]);
      setIsLoading(false);
    }, 1500); // 1.5 seconds ka delay

    return () => clearTimeout(timer); // Cleanup
  }, []);

  const quickStats = [
    { label: 'Total Users', value: stats?.totalUsers ?? 0, icon: Users, color: 'text-primary', bgColor: 'bg-primary/10' },
    { label: 'Active Tournaments', value: stats?.activeTournaments ?? 0, icon: Trophy, color: 'text-secondary', bgColor: 'bg-secondary/10' },
    { label: 'Total Revenue', value: formatCurrency(stats?.totalRevenue ?? 0), icon: DollarSign, color: 'text-success', bgColor: 'bg-success/10' },
    { label: 'Pending Withdrawals', value: stats?.pendingWithdrawals ?? 0, icon: TrendingDown, color: 'text-warning', bgColor: 'bg-warning/10' },
  ];
  
  // Loading state ke liye Skeleton component
  if (isLoading) {
    return (
      <div>
        <div className="mb-8"><Skeleton className="h-10 w-1/3" /></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-32 rounded-lg" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Skeleton className="h-64 rounded-lg" />
          <Skeleton className="h-64 rounded-lg" />
        </div>
        <Skeleton className="h-24 rounded-lg" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <NeonText as="h1" className="text-3xl md:text-4xl mb-2">
          Admin Dashboard
        </NeonText>
        <p className="text-muted-foreground">Overview of platform performance</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat, index) => (
          <Card key={index} className="p-6 bg-gradient-card border-card-border">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
            <p className="text-2xl font-bold">
              <NeonText>{stat.value}</NeonText>
            </p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Platform Overview */}
        <Card className="p-6 bg-gradient-card border-card-border">
          <h2 className="text-xl font-bold mb-6">Platform Overview</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3"><div className="p-2 rounded-lg bg-primary/10"><Users className="h-5 w-5 text-primary" /></div><span className="text-muted-foreground">Active Users</span></div>
              <span className="font-bold text-lg">{stats?.activeUsers}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3"><div className="p-2 rounded-lg bg-secondary/10"><Trophy className="h-5 w-5 text-secondary" /></div><span className="text-muted-foreground">Total Tournaments</span></div>
              <span className="font-bold text-lg">{stats?.totalTournaments}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3"><div className="p-2 rounded-lg bg-success/10"><TrendingUp className="h-5 w-5 text-success" /></div><span className="text-muted-foreground">Total Deposits</span></div>
              <span className="font-bold text-lg text-success">{formatCurrency(stats?.totalDeposits ?? 0)}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3"><div className="p-2 rounded-lg bg-accent/10"><TrendingDown className="h-5 w-5 text-accent" /></div><span className="text-muted-foreground">Total Payouts</span></div>
              <span className="font-bold text-lg text-accent">{formatCurrency(stats?.totalPayouts ?? 0)}</span>
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6 bg-gradient-card border-card-border">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-bold">Recent Activity</h2>
          </div>
          {recentActivity.length > 0 ? (
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-4 border-b border-border last:border-0">
                  <div className={`p-2 rounded-full ${ activity.type === 'user_signup' ? 'bg-primary/10' : activity.type === 'tournament_join' ? 'bg-secondary/10' : activity.type === 'withdrawal' ? 'bg-accent/10' : 'bg-success/10'}`}>
                    {activity.type === 'user_signup' && <Users className="h-4 w-4 text-primary" />}
                    {activity.type === 'tournament_join' && <Trophy className="h-4 w-4 text-secondary" />}
                    {activity.type === 'withdrawal' && <TrendingDown className="h-4 w-4 text-accent" />}
                    {activity.type === 'deposit' && <TrendingUp className="h-4 w-4 text-success" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">
                      {activity.type === 'user_signup' && `${activity.user} signed up`}
                      {activity.type === 'tournament_join' && `${activity.user} joined ${activity.tournament}`}
                      {activity.type === 'withdrawal' && activity.amount && `${activity.user} withdrew ${formatCurrency(activity.amount)}`}
                      {activity.type === 'deposit' && activity.amount && `${activity.user} deposited ${formatCurrency(activity.amount)}`}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-40">
                <p className="text-muted-foreground">No recent activity.</p>
            </div>
          )}
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6 bg-gradient-card border-card-border">
        <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to={ROUTES.ADMIN_MATCHES}>
            <Button className="w-full bg-gradient-primary shadow-glow-primary">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Tournament
            </Button>
          </Link>
          <Link to={ROUTES.ADMIN_PAYMENTS}>
            <Button variant="outline" className="w-full">
              <CreditCard className="mr-2 h-4 w-4" />
              View Payout Queue
            </Button>
          </Link>
          <Link to={ROUTES.ADMIN_USERS}>
            <Button variant="outline" className="w-full">
              <Users className="mr-2 h-4 w-4" />
              Manage Users
            </Button>
          </Link>
          <Link to={ROUTES.ADMIN_ROLES}>
            <Button variant="outline" className="w-full">
              <UserCog className="mr-2 h-4 w-4" />
              Manage Team
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}