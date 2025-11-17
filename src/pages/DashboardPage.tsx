import { Wallet, Trophy, TrendingUp, TrendingDown, History } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { NeonText } from '@/components/ui/NeonText';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/utils/constants';
import { formatCurrency } from '@/utils/helpers';

export default function DashboardPage() {
  // Mock data - will be replaced with actual API calls
  const stats = {
    totalDeposit: 5000,
    totalWithdraw: 2000,
    totalWinnings: 8500,
    totalLosses: 1500,
    matchesPlayed: 25,
    matchesWon: 15,
  };

  const recentMatches = [
    { id: '1', title: 'Free Fire Solo Championship', prize: 500, position: 1, date: '2024-01-10' },
    { id: '2', title: 'Squad Battle Royale', prize: 0, position: 8, date: '2024-01-09' },
    { id: '3', title: 'Clash Squad Finals', prize: 300, position: 2, date: '2024-01-08' },
  ];

  const quickStats = [
    { label: 'Total Deposit', value: stats.totalDeposit, icon: Wallet, color: 'text-primary' },
    { label: 'Total Withdraw', value: stats.totalWithdraw, icon: TrendingDown, color: 'text-accent' },
    { label: 'Total Winnings', value: stats.totalWinnings, icon: TrendingUp, color: 'text-success' },
    { label: 'Total Losses', value: stats.totalLosses, icon: TrendingDown, color: 'text-destructive' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <NeonText as="h1" className="text-3xl md:text-4xl mb-2">
          Dashboard
        </NeonText>
        <p className="text-muted-foreground">Track your performance and earnings</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat, index) => (
          <Card key={index} className="p-6 bg-gradient-card border-card-border">
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
            <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
            <p className="text-2xl font-bold">
              <NeonText color={stat.color === 'text-primary' ? 'primary' : 'accent'}>
                {formatCurrency(stat.value)}
              </NeonText>
            </p>
          </Card>
        ))}
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6 bg-gradient-card border-card-border">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-bold">Match Statistics</h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Matches Played</span>
              <span className="font-bold text-lg">{stats.matchesPlayed}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Matches Won</span>
              <span className="font-bold text-lg text-success">{stats.matchesWon}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Win Rate</span>
              <span className="font-bold text-lg text-primary">
                {((stats.matchesWon / stats.matchesPlayed) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card border-card-border">
          <div className="flex items-center gap-3 mb-4">
            <History className="h-6 w-6 text-secondary" />
            <h2 className="text-xl font-bold">Recent Activity</h2>
          </div>
          <div className="space-y-3">
            {recentMatches.map((match) => (
              <div key={match.id} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                <div className="flex-1">
                  <p className="font-medium text-sm">{match.title}</p>
                  <p className="text-xs text-muted-foreground">{match.date}</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${match.prize > 0 ? 'text-success' : 'text-muted-foreground'}`}>
                    {match.prize > 0 ? `+${formatCurrency(match.prize)}` : 'No Prize'}
                  </p>
                  <p className="text-xs text-muted-foreground">#{match.position}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6 bg-gradient-card border-card-border">
        <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to={ROUTES.TOURNAMENTS}>
            <Button className="w-full bg-gradient-primary shadow-glow-primary">
              Join Tournament
            </Button>
          </Link>
          <Link to={ROUTES.WALLET}>
            <Button variant="outline" className="w-full">
              Add Funds
            </Button>
          </Link>
          <Link to={ROUTES.WITHDRAW}>
            <Button variant="outline" className="w-full">
              Withdraw
            </Button>
          </Link>
          <Link to={ROUTES.MY_MATCHES}>
            <Button variant="outline" className="w-full">
              My Matches
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
