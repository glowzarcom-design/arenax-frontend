import { Link } from 'react-router-dom';
import { Trophy, Users, Zap, Shield, Gamepad2, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { NeonText } from '@/components/ui/NeonText';
import { ROUTES } from '@/utils/constants';
import heroImage from '@/assets/hero-bg.jpg';

export default function HomePage() {
  const features = [
    {
      icon: Trophy,
      title: 'Win Prizes',
      description: 'Compete in tournaments and win real cash prizes',
      color: 'text-primary',
    },
    {
      icon: Users,
      title: 'Join Community',
      description: 'Play with thousands of gamers worldwide',
      color: 'text-secondary',
    },
    {
      icon: Zap,
      title: 'Instant Payouts',
      description: 'Quick and secure withdrawal to your account',
      color: 'text-accent',
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Safe and fair gaming environment',
      color: 'text-success',
    },
  ];

  const stats = [
    { label: 'Active Players', value: '10,000+', icon: Users },
    { label: 'Tournaments', value: '500+', icon: Trophy },
    { label: 'Prize Pool', value: '₹50L+', icon: TrendingUp },
    { label: 'Games', value: '5+', icon: Gamepad2 },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-[600px] lg:h-[700px] flex items-center justify-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div className="relative z-10 container mx-auto px-4 text-center animate-slide-up">
          <NeonText as="h1" className="text-4xl md:text-6xl lg:text-7xl mb-6" animate>
            Welcome to ArenaX
          </NeonText>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Compete in epic gaming tournaments, win real prizes, and become a legend
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={ROUTES.SIGNUP}>
              <Button size="lg" className="bg-gradient-primary shadow-glow-primary text-lg px-8 animate-glow-pulse">
                Start Playing Now
              </Button>
            </Link>
            <Link to={ROUTES.TOURNAMENTS}>
              <Button size="lg" variant="outline" className="text-lg px-8 border-primary hover:bg-primary/10">
                View Tournaments
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background-elevated">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 text-center bg-gradient-card border-card-border">
                <stat.icon className="h-10 w-10 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-bold mb-2">
                  <NeonText color="primary">{stat.value}</NeonText>
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <NeonText as="h2" className="text-3xl md:text-4xl mb-4" color="secondary">
              Why Choose ArenaX?
            </NeonText>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join the ultimate gaming platform designed for competitive players
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 bg-gradient-card border-card-border hover:shadow-glow-primary transition-all duration-300 hover:-translate-y-2"
              >
                <feature.icon className={`h-12 w-12 mb-4 ${feature.color}`} />
                <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <NeonText as="h2" className="text-3xl md:text-4xl mb-6" color="accent">
            Ready to Dominate?
          </NeonText>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of players competing for real prizes. Start your journey today!
          </p>
          <Link to={ROUTES.SIGNUP}>
            <Button size="lg" className="bg-gradient-secondary shadow-glow-secondary text-lg px-12">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <NeonText as="h2" className="text-3xl md:text-4xl mb-4">
              How It Works
            </NeonText>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Sign Up',
                description: 'Create your free account and complete your profile',
              },
              {
                step: '02',
                title: 'Join Tournament',
                description: 'Choose a tournament and pay the entry fee',
              },
              {
                step: '03',
                title: 'Win Prizes',
                description: 'Compete, win, and withdraw your earnings instantly',
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-6xl font-bold mb-4 opacity-20">{item.step}</div>
                <h3 className="text-2xl font-bold mb-3">
                  <NeonText color="primary">{item.title}</NeonText>
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
