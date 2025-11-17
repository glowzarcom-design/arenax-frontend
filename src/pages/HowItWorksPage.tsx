import { Link } from 'react-router-dom';
import { NeonText } from '@/components/ui/NeonText';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ROUTES } from '@/utils/constants';
import { UserPlus, Wallet, Trophy, Gift, Target, Zap, Share2, TrendingUp, Users } from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    {
      icon: UserPlus,
      title: 'Sign Up',
      description: 'Create your account with your gaming credentials including In-Game Name and Free Fire ID.',
      color: 'text-cyan-400',
      glow: 'shadow-[0_0_20px_rgba(34,211,238,0.3)]',
    },
    {
      icon: Wallet,
      title: 'Add Funds',
      description: 'Deposit money into your wallet securely using UPI, Net Banking, or other payment methods.',
      color: 'text-purple-400',
      glow: 'shadow-[0_0_20px_rgba(168,85,247,0.3)]',
    },
    {
      icon: Target,
      title: 'Join Tournaments',
      description: 'Browse available tournaments, pay the entry fee, and get ready to compete with players worldwide.',
      color: 'text-pink-400',
      glow: 'shadow-[0_0_20px_rgba(244,114,182,0.3)]',
    },
    {
      icon: Zap,
      title: 'Compete & Play',
      description: 'Join the match at the scheduled time, give your best performance, and aim for the top positions.',
      color: 'text-blue-400',
      glow: 'shadow-[0_0_20px_rgba(96,165,250,0.3)]',
    },
    {
      icon: Trophy,
      title: 'Win Prizes',
      description: 'Winners receive prize money directly in their wallet based on their rank and performance.',
      color: 'text-yellow-400',
      glow: 'shadow-[0_0_20px_rgba(250,204,21,0.3)]',
    },
    {
      icon: Gift,
      title: 'Withdraw & Earn',
      description: 'Withdraw your winnings anytime to your UPI or bank account. Earn extra through referrals!',
      color: 'text-green-400',
      glow: 'shadow-[0_0_20px_rgba(74,222,128,0.3)]',
    },
  ];

  const features = [
    {
      title: 'Secure Payments',
      description: 'All transactions are encrypted and processed through secure payment gateways.',
    },
    {
      title: 'Fair Play',
      description: 'Advanced fraud detection and monitoring ensure a fair gaming environment for all.',
    },
    {
      title: 'Instant Withdrawals',
      description: 'Get your winnings transferred quickly with our streamlined withdrawal process.',
    },
    {
      title: 'Referral Rewards',
      description: 'Earn ₹10 per referral signup and ₹100 when they win their first match.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <NeonText className="text-4xl md:text-5xl font-bold mb-6">
              How It Works
            </NeonText>
            <p className="text-lg text-muted-foreground">
              Join ArenaX in 6 simple steps and start competing in tournaments to win real prizes
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <Card 
                key={index} 
                className="bg-card/50 backdrop-blur-sm border-2 border-border hover:border-primary transition-all duration-500 group relative overflow-hidden shadow-lg hover:shadow-glow-primary"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-gradient-to-br from-primary/20 to-secondary/20 -z-10" />
                <CardContent className="p-6 relative z-10">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-lg bg-background border border-border ${step.glow} mb-4 group-hover:scale-110 transition-transform`}>
                    <step.icon className={`w-8 h-8 ${step.color}`} />
                  </div>
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-3xl font-bold text-primary/30">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <h3 className="text-xl font-semibold text-foreground mt-1">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background-elevated">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose <span className="text-primary">ArenaX</span>?
            </h2>
            <p className="text-muted-foreground">
              Experience the best gaming tournament platform with features designed for competitive gamers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border border-border hover:border-primary hover:shadow-glow-primary transition-all duration-300 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardContent className="p-6 relative z-10">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Affiliate Program Section */}
      <section className="py-20 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <NeonText as="h2" className="text-3xl md:text-4xl mb-4">
              Affiliate Program
            </NeonText>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Earn rewards by inviting friends to join ArenaX
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-5xl mx-auto">
            <Card className="bg-card/50 backdrop-blur-sm border-2 border-border hover:border-primary transition-all duration-500 group relative overflow-hidden shadow-lg hover:shadow-[0_0_40px_rgba(0,255,255,0.5)]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl bg-gradient-to-br from-primary/40 to-secondary/40 -z-10" />
              <CardContent className="p-6 relative z-10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-background border border-border group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] mb-4 group-hover:scale-110 transition-all">
                  <Share2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Share Your Link</h3>
                <p className="text-muted-foreground">
                  Get your unique referral link and share it with friends
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-2 border-border hover:border-secondary transition-all duration-500 group relative overflow-hidden shadow-lg hover:shadow-[0_0_40px_rgba(168,85,247,0.5)]">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl bg-gradient-to-br from-secondary/40 to-accent/40 -z-10" />
              <CardContent className="p-6 relative z-10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-background border border-border group-hover:border-secondary group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] mb-4 group-hover:scale-110 transition-all">
                  <Gift className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Earn Bonuses</h3>
                <p className="text-muted-foreground">
                  ₹10 per signup + ₹100 when they win tournaments
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-2 border-border hover:border-accent transition-all duration-500 group relative overflow-hidden shadow-lg hover:shadow-[0_0_40px_rgba(244,114,182,0.5)]">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl bg-gradient-to-br from-accent/40 to-primary/40 -z-10" />
              <CardContent className="p-6 relative z-10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-background border border-border group-hover:border-accent group-hover:shadow-[0_0_20px_rgba(244,114,182,0.4)] mb-4 group-hover:scale-110 transition-all">
                  <TrendingUp className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Track Earnings</h3>
                <p className="text-muted-foreground">
                  Monitor your referrals and earnings in real-time
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link to={ROUTES.REFERRAL}>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/50 hover:bg-primary/10 hover:border-primary hover:shadow-glow-primary transition-all group"
              >
                View Affiliate Dashboard
                <Users className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20 max-w-4xl mx-auto">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to Start Winning?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of gamers competing in tournaments and winning real prizes every day
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={ROUTES.SIGNUP}>
                  <Button size="lg" className="w-full sm:w-auto">
                    Sign Up Now
                  </Button>
                </Link>
                <Link to={ROUTES.TOURNAMENTS}>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Browse Tournaments
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
