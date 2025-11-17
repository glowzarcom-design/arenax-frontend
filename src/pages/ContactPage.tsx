// src/pages/ContactPage.tsx

import { Mail, Send, Headset } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { NeonText } from '@/components/ui/NeonText';
import { toast } from 'sonner';

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to an email sending service or backend endpoint
    toast.success('Your message has been sent! We will get back to you soon.');
    // Here you would typically clear the form
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <NeonText as="h1" className="text-4xl md:text-5xl mb-4">
            Get in Touch
          </NeonText>
          <p className="text-lg text-muted-foreground">
            Have questions or need support? We're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Email Support */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-2 border-border hover:border-primary transition-all duration-300 shadow-lg hover:shadow-glow-primary group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-background border border-border group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] mb-4 group-hover:scale-110 transition-all">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Email Support</h3>
              <p className="text-muted-foreground mb-4">
                Send us an email for any inquiries.
              </p>
              <a href="mailto:helparenax@zohomail.in" className="font-semibold text-primary hover:underline">
                helparenax@zohomail.in
              </a>
            </div>
          </Card>

          {/* Telegram Support */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-2 border-border hover:border-secondary transition-all duration-300 shadow-lg hover:shadow-glow-secondary group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-background border border-border group-hover:border-secondary group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] mb-4 group-hover:scale-110 transition-all">
                <Send className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Telegram Support</h3>
              <p className="text-muted-foreground mb-4">
                Join our Telegram for instant support.
              </p>
              <a href="https://t.me/+6IoFwhsuUkEzMGM9" target="_blank" rel="noopener noreferrer" className="font-semibold text-secondary hover:underline">
                Join Telegram Channel
              </a>
            </div>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="p-8 bg-gradient-card border-card-border">
          <div className="flex items-center gap-3 mb-6">
            <Headset className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold">Send a Message</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Your Name</label>
                <Input type="text" placeholder="John Doe" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Your Email</label>
                <Input type="email" placeholder="john.doe@example.com" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <Input type="text" placeholder="e.g., Payment Issue" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <Textarea placeholder="Write your message here..." rows={5} required />
            </div>
            <Button type="submit" className="w-full bg-gradient-primary shadow-glow-primary">
              Send Message
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}