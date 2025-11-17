import { useState } from 'react';
import { Copy, Users, TrendingUp, Wallet, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { NeonText } from '@/components/ui/NeonText';
import { formatCurrency, copyToClipboard } from '@/utils/helpers';
import { REFERRAL_TERMS } from '@/utils/constants';
import { toast } from 'sonner';

export default function ReferralPage() {
  const [copied, setCopied] = useState(false);
  
  // Mock data - will be replaced with actual API calls
  const referralCode = 'PLAY123ABC';
  const referralLink = `https://arenax.com/signup?ref=${referralCode}`;
  
  const stats = {
    totalReferrals: 12,
    totalReferralDeposits: 25000,
    totalReferralWinnings: 35000,
    totalEarnings: 4620,
    pendingEarnings: 320,
  };

  const recentReferrals = [
    { username: 'gamer123', type: 'member_bonus', amount: 10, date: '2024-01-10', status: 'credited' },
    { username: 'progamer456', type: 'winning_bonus', amount: 100, date: '2024-01-09', status: 'credited' },
    { username: 'eliteplayer', type: 'member_bonus', amount: 10, date: '2024-01-08', status: 'pending' },
  ];

  const handleCopy = async () => {
    const success = await copyToClipboard(referralLink);
    if (success) {
      setCopied(true);
      toast.success('Referral link copied!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const statCards = [
    { label: 'Total Referrals', value: stats.totalReferrals, icon: Users, color: 'text-primary' },
    { label: 'Referral Deposits', value: formatCurrency(stats.totalReferralDeposits), icon: Wallet, color: 'text-secondary' },
    { label: 'Referral Winnings', value: formatCurrency(stats.totalReferralWinnings), icon: TrendingUp, color: 'text-accent' },
    { label: 'Total Earnings', value: formatCurrency(stats.totalEarnings), icon: TrendingUp, color: 'text-success' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <NeonText as="h1" className="text-3xl md:text-4xl mb-2">
          Affiliate Dashboard
        </NeonText>
        <p className="text-muted-foreground">Track your referrals and earnings in real-time</p>
      </div>

      {/* Referral Code Card */}
      <Card className="p-6 mb-8 bg-card/50 backdrop-blur-sm border-2 border-border hover:border-primary transition-all duration-300 shadow-lg hover:shadow-glow-primary relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <h2 className="text-xl font-bold mb-4 relative z-10">Your Referral Link</h2>
        <div className="flex flex-col sm:flex-row gap-3 relative z-10">
          <Input 
            value={referralLink}
            readOnly
            className="flex-1"
          />
          <Button
            onClick={handleCopy}
            className="gap-2 bg-gradient-primary shadow-glow-primary hover:shadow-glow-primary/80 transition-all"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied!' : 'Copy Link'}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-3 relative z-10">
          Share this link with your friends to start earning
        </p>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <Card key={index} className="p-6 bg-card/50 backdrop-blur-sm border border-border hover:border-primary hover:shadow-glow-primary transition-all duration-300 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <stat.icon className={`h-8 w-8 ${stat.color} mb-3 relative z-10 group-hover:scale-110 transition-transform`} />
            <p className="text-sm text-muted-foreground mb-1 relative z-10">{stat.label}</p>
            <p className="text-2xl font-bold relative z-10">
              <NeonText>{stat.value}</NeonText>
            </p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Terms & Conditions */}
        <Card className="p-6 bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300">
          <h2 className="text-xl font-bold mb-4">Terms & Conditions</h2>
          <div className="space-y-4 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold">₹{REFERRAL_TERMS.MEMBER_BONUS}</span>
              </div>
              <div>
                <p className="font-medium text-foreground">New Member Bonus</p>
                <p>Earn ₹{REFERRAL_TERMS.MEMBER_BONUS} for every new member who signs up using your referral link.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                <span className="text-success font-bold">₹{REFERRAL_TERMS.WINNING_BONUS}</span>
              </div>
              <div>
                <p className="font-medium text-foreground">Winning Bonus</p>
                <p>Earn ₹{REFERRAL_TERMS.WINNING_BONUS} when your referred user wins a tournament.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <span className="text-accent font-bold">₹{REFERRAL_TERMS.MIN_WITHDRAW}</span>
              </div>
              <div>
                <p className="font-medium text-foreground">Minimum Withdrawal</p>
                <p>You can withdraw your referral earnings once you reach ₹{REFERRAL_TERMS.MIN_WITHDRAW}.</p>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-xs">
                * Referral bonuses are credited automatically<br />
                * Bonuses are subject to verification<br />
                * Terms and conditions apply
              </p>
            </div>
          </div>
        </Card>

        {/* Recent Transactions */}
        <Card className="p-6 bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300">
          <h2 className="text-xl font-bold mb-4">Recent Earnings</h2>
          <div className="space-y-3">
            {recentReferrals.map((referral, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-3 border-b border-border last:border-0"
              >
                <div>
                  <p className="font-medium">{referral.username}</p>
                  <p className="text-xs text-muted-foreground">
                    {referral.type === 'member_bonus' ? 'Member Bonus' : 'Winning Bonus'} • {referral.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-success">+{formatCurrency(referral.amount)}</p>
                  <p className={`text-xs ${
                    referral.status === 'credited' ? 'text-success' : 'text-warning'
                  }`}>
                    {referral.status === 'credited' ? 'Credited' : 'Pending'}
                  </p>
                </div>
              </div>
            ))}
            {recentReferrals.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No referral earnings yet. Start inviting friends!
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

// Simple Input component for this page (since we're using it)
const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { className?: string }) => (
  <input
    className={`w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground ${className}`}
    {...props}
  />
);
