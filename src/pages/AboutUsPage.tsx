// src/pages/AboutUsPage.tsx

import { ShieldCheck, Zap, Trophy, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { NeonText } from '@/components/ui/NeonText';

export default function AboutUsPage() {
  const features = [
    { icon: ShieldCheck, title: 'Secure & Fair Play', description: 'Manual + automated anti-fraud systems ensure fair competition.' },
    { icon: Zap, title: 'Instant Settlements', description: 'Fast deposits and instant wallet settlements for winners.' },
    { icon: Trophy, title: 'Daily Tournaments', description: 'Compete in daily Free Fire tournaments with verified results.' },
    { icon: Users, title: '24/7 Support', description: 'Our team is always here to help you with any issues.' },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <NeonText as="h1" className="text-4xl md:text-5xl mb-4">
            About ArenaX
          </NeonText>
          <p className="text-lg text-muted-foreground">
            India's advanced online esports tournament platform for competitive mobile gamers.
          </p>
        </div>

        <Card className="p-8 mb-12 bg-gradient-card border-card-border">
          <h2 className="text-2xl font-bold mb-4 text-primary">Our Vision</h2>
          <p className="text-muted-foreground">
            To become India’s most trusted and user-friendly esports platform offering secure wallet systems, instant payouts, real-time match data, and fair gaming for all.
          </p>
        </Card>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8"><NeonText color="secondary">What We Offer</NeonText></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 bg-card/50 border-border hover:border-primary transition-all">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        <Card className="p-8 bg-gradient-card border-card-border">
          <h2 className="text-2xl font-bold mb-4 text-accent">Our Commitment</h2>
          <p className="text-muted-foreground mb-4">
            We ensure fair competition, strict security, and a smooth gaming experience. ArenaX is built for gamers who want to play seriously and win genuinely.
          </p>
          <p className="text-muted-foreground">
            For business inquiries, please contact us at: <a href="mailto:helparenax@zohomail.in" className="font-semibold text-accent hover:underline">helparenax@zohomail.in</a>
          </p>
        </Card>
      </div>
    </div>
  );
}