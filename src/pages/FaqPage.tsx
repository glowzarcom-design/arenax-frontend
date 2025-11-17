import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { NeonText } from '@/components/ui/NeonText';
import { cn } from '@/lib/utils';

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How do I join a tournament?',
      answer: 'To join a tournament, browse available tournaments, select one, and click "Join Now". Make sure you have sufficient balance to pay the entry fee.',
    },
    {
      question: 'How do I add funds to my wallet?',
      answer: 'Go to the Wallet page and click "Add Funds". You can deposit using UPI, bank transfer, or other supported payment methods. Deposits are instant.',
    },
    {
      question: 'When can I withdraw my winnings?',
      answer: 'You can request a withdrawal anytime. Withdrawals are processed within 24-48 hours. Make sure you have completed your profile and added payment methods.',
    },
    {
      question: 'What happens if I disconnect during a match?',
      answer: 'If you disconnect, you have 5 minutes to rejoin. If you fail to rejoin, you will be disqualified and your entry fee will be forfeited.',
    },
    {
      question: 'How does the referral program work?',
      answer: 'Share your referral link with friends. Earn ₹10 when they sign up and ₹100 when they win a tournament. Your earnings are credited automatically.',
    },
    {
      question: 'Are the tournaments fair?',
      answer: 'Yes! All tournaments are monitored for fair play. We use anti-cheat systems and manual verification for large prize pools. Cheaters are permanently banned.',
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept UPI, bank transfers, and major payment gateways. All transactions are secure and encrypted.',
    },
    {
      question: 'How are prizes distributed?',
      answer: 'Prizes are distributed based on your position in the tournament. The prize breakdown is shown before you join. Winners receive prizes within 24 hours.',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <NeonText as="h1" className="text-3xl md:text-5xl mb-4">
            Frequently Asked Questions
          </NeonText>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about ArenaX
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const glowColors = [
              { border: 'hover:border-primary', shadow: 'hover:shadow-[0_0_30px_rgba(0,255,255,0.4)]', gradient: 'from-primary/40 to-secondary/40' },
              { border: 'hover:border-secondary', shadow: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]', gradient: 'from-secondary/40 to-accent/40' },
              { border: 'hover:border-accent', shadow: 'hover:shadow-[0_0_30px_rgba(244,114,182,0.4)]', gradient: 'from-accent/40 to-primary/40' },
            ];
            const colorSet = glowColors[index % 3];
            
            return (
              <Card
                key={index}
                className={cn(
                  "overflow-hidden bg-card/50 backdrop-blur-sm border-2 border-border transition-all duration-500 group relative shadow-lg",
                  colorSet.border,
                  colorSet.shadow
                )}
              >
                <div className={cn(
                  "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl -z-10",
                  `bg-gradient-to-br ${colorSet.gradient}`
                )} />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left relative z-10 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-foreground pr-4">
                    {faq.question}
                  </h3>
                  {openIndex === index ? (
                    <Minus className="h-5 w-5 text-primary flex-shrink-0 transition-transform group-hover:scale-110" />
                  ) : (
                    <Plus className="h-5 w-5 text-muted-foreground group-hover:text-primary flex-shrink-0 transition-all group-hover:scale-110" />
                  )}
                </button>
                
                <div
                  className={cn(
                    'overflow-hidden transition-all duration-300 relative z-10',
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  )}
                >
                  <div className="px-6 pb-6 text-muted-foreground">
                    {faq.answer}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Contact CTA */}
        <Card className="mt-12 p-8 text-center bg-card/50 backdrop-blur-sm border-2 border-border hover:border-primary transition-all duration-500 group relative overflow-hidden shadow-lg hover:shadow-[0_0_40px_rgba(0,255,255,0.5)]">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl bg-gradient-to-br from-primary/40 to-secondary/40 -z-10" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-4 text-foreground">Still have questions?</h2>
            <p className="text-muted-foreground mb-6">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <a href="/contact">
              <button className="px-8 py-3 bg-primary/10 text-primary border border-primary/30 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] transition-all">
                Contact Support
              </button>
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
