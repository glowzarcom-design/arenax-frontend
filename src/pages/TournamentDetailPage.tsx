// src/pages/TournamentDetailPage.tsx

import { useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { NeonText } from '@/components/ui/NeonText';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';
import { formatCurrency, formatDateTime } from '@/utils/helpers';
import { Trophy, DollarSign, Users, Clock } from 'lucide-react';

// Single tournament ka type define karenge
interface TournamentDetails {
  id: string;
  title: string;
  gameName: string;
  entryFee: number;
  prizePool: number;
  maxPlayers: number;
  currentPlayers: number;
  startTime: string;
  status: 'upcoming' | 'live' | 'completed' | 'cancelled';
  description: string;
  rules: string;
}

export default function TournamentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [tournament, setTournament] = useState<TournamentDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Yahan future me Supabase se is ID ka data fetch hoga
    console.log(`Fetching data for tournament ID: ${id}`);
    
    // Abhi ke liye dummy data dikha kar loading state set kar denge
    const timer = setTimeout(() => {
       const mockTournament: TournamentDetails = {
          id: id || '1',
          title: 'Free Fire Solo Championship',
          gameName: 'Free Fire',
          entryFee: 50,
          prizePool: 5000,
          maxPlayers: 100,
          currentPlayers: 87,
          startTime: new Date().toISOString(),
          status: 'upcoming',
          description: 'The ultimate solo battle for glory and prizes. Are you ready to be the last one standing?',
          rules: '1. All players must join on time.\n2. No hacks or cheats allowed.\n3. Admin decision is final.'
       };
       setTournament(mockTournament);
       setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/4 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <Skeleton className="h-48 w-full" />
                </div>
                <div>
                    <Skeleton className="h-10 w-full mb-4" />
                    <Skeleton className="h-10 w-full mb-4" />
                    <Skeleton className="h-10 w-full" />
                </div>
            </div>
            <Skeleton className="h-12 w-full mt-8" />
        </div>
    );
  }

  if (!tournament) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <NeonText as="h2" color="accent">Tournament Not Found</NeonText>
        <p className="text-muted-foreground mt-2">The tournament you are looking for does not exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="p-6 sm:p-8 bg-card/50 backdrop-blur-sm border-2 border-primary/20 shadow-lg">
        <div className="mb-8">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-3 capitalize">{tournament.status}</span>
            <NeonText as="h1" className="text-3xl md:text-4xl">
            {tournament.title}
            </NeonText>
            <p className="text-muted-foreground mt-2">Game: {tournament.gameName}</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 text-center border-y border-border/50 py-6">
           <div className="flex flex-col items-center gap-2"><Trophy className="h-6 w-6 text-success" /><p className="text-sm text-muted-foreground">Prize Pool</p><p className="text-xl font-bold text-success">{formatCurrency(tournament.prizePool)}</p></div>
           <div className="flex flex-col items-center gap-2"><DollarSign className="h-6 w-6 text-accent" /><p className="text-sm text-muted-foreground">Entry Fee</p><p className="text-xl font-bold">{formatCurrency(tournament.entryFee)}</p></div>
           <div className="flex flex-col items-center gap-2"><Users className="h-6 w-6 text-secondary" /><p className="text-sm text-muted-foreground">Players</p><p className="text-xl font-bold">{tournament.currentPlayers} / {tournament.maxPlayers}</p></div>
           <div className="flex flex-col items-center gap-2"><Clock className="h-6 w-6 text-warning" /><p className="text-sm text-muted-foreground">Starts At</p><p className="text-base font-bold">{formatDateTime(tournament.startTime)}</p></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
                <h3 className="text-xl font-semibold mb-3">Description</h3>
                <p className="text-muted-foreground leading-relaxed">{tournament.description}</p>
            </div>
            <div>
                <h3 className="text-xl font-semibold mb-3">Rules</h3>
                <p className="text-muted-foreground whitespace-pre-line leading-relaxed">{tournament.rules}</p>
            </div>
        </div>

        <Button size="lg" className="w-full bg-gradient-primary shadow-glow-primary text-lg" disabled={tournament.status !== 'upcoming' || tournament.currentPlayers >= tournament.maxPlayers}>
          {tournament.currentPlayers >= tournament.maxPlayers ? 'Tournament Full' : `Join Tournament (${formatCurrency(tournament.entryFee)})`}
        </Button>
      </Card>
    </div>
  );
}