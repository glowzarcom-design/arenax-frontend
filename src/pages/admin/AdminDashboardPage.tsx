// src/pages/admin/AdminDashboardPage.tsx

import { useState, useEffect } from 'react';
import { Users, Trophy, DollarSign, TrendingUp, TrendingDown, Activity, PlusCircle, CreditCard, UserCog } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { NeonText } from '@/components/ui/NeonText';
import { formatCurrency } from '@/utils/helpers';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/utils/constants';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/lib/supabaseClient'; // Supabase client import kiya

interface AdminStats {
  totalUsers: number;
  activeUsers: number; // Isko abhi ke liye total users hi maanenge
  totalTournaments: number;
  activeTournaments: number;
  totalRevenue: number; // Yeh calculated field hoga
  pendingWithdrawals: number;
  totalDeposits: number;
  totalPayouts: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStats = async () => {
      setIsLoading(true);

      try {
        // Alag-alag data ko ek saath fetch karenge
        const [
          { count: totalUsers, error: userError },
          { count: totalTournaments, error: tournamentError },
          { count: activeTournaments, error: activeTournamentError },
          // Abhi ke liye aage ke stats ko zero rakhenge, inke liye complex queries lagegi
        ] = await Promise.all([
          supabase.from('profiles').select('*', { count: 'exact', head: true }),
          supabase.from('matches').select('*', { count: 'exact', head: true }),
          supabase.from('matches').select('*', { count: 'exact', head: true }).eq('status', 'live'),
        ]);

        if (userError || tournamentError || activeTournamentError) {
          throw new Error('Failed to fetch stats');
        }

        // Stats ko set karenge
        setStats({
          totalUsers: totalUsers ?? 0,
          activeUsers: totalUsers ?? 0, // Abhi ke liye dummy
          totalTournaments: totalTournaments ?? 0,
          activeTournaments: activeTournaments ?? 0,
          totalRevenue: 0, // Iske liye alag se logic lagega
          pendingWithdrawals: 0, // Iske liye alag se logic lagega
          totalDeposits: 0, // Iske liye alag se logic lagega
          totalPayouts: 0, // Iske liye alag se logic lagega
        });

      } catch (error) {
        console.error("Error fetching admin stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminStats();
  }, []);

  const quickStats = [
    { label: 'Total Users', value: stats?.totalUsers ?? 0, icon: Users, color: 'text-primary', bgColor: 'bg-primary/10' },
    { label: 'Active Tournaments', value: stats?.activeTournaments ?? 0, icon: Trophy, color: 'text-secondary', bgColor: 'bg-secondary/10' },
    { label: 'Total Revenue', value: formatCurrency(stats?.totalRevenue ?? 0), icon: DollarSign, color: 'text-success', bgColor: 'bg-success/10' },
    { label: 'Pending Withdrawals', value: stats?.pendingWithdrawals ?? 0, icon: TrendingDown, color: 'text-warning', bgColor: 'bg-warning/10' },
  ];

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

  // Baaki ka component aesa hi rahega
  return (
    <div>
      <div className="mb-8">
        <NeonText as="h1" className="text-3xl md:text-4xl mb-2">
          Admin Dashboard
        </NeonText>
        <p className="text-muted-foreground">Overview of platform performance</p>
      </div>

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

        <Card className="p-6 bg-gradient-card border-card-border">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-bold">Recent Activity</h2>
          </div>
          <div className="flex items-center justify-center h-40">
            <p className="text-muted-foreground">No recent activity to show.</p>
          </div>
        </Card>
      </div>

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