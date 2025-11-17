import { useState, useEffect } from 'react';
import { Search, Trophy, Users, Clock, DollarSign } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NeonText } from '@/components/ui/NeonText';
import { Link } from 'react-router-dom';
import { formatCurrency, formatDateTime } from '@/utils/helpers';
import { ROUTES } from '@/utils/constants';
import { supabase } from '@/lib/supabaseClient'; // Supabase client import karo
import { Tournament } from '@/types'; // Tournament type import karo
import { Skeleton } from '@/components/ui/skeleton'; // Skeleton import karo

export default function TournamentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'upcoming' | 'live'>('all');
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTournaments = async () => {
      setIsLoading(true);
      let query = supabase.from('matches').select('*');

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`);
      }

      const { data, error } = await query.order('start_time', { ascending: true });

      if (error) {
        console.error('Error fetching tournaments:', error);
      } else {
        // Supabase se aaye data ko frontend ke 'Tournament' type mein map karenge
        const formattedData: Tournament[] = data.map(item => ({
            id: item.id,
            title: item.title,
            gameName: item.game_name,
            entryFee: item.entry_fee,
            prizePool: item.prize_pool,
            maxPlayers: item.max_players,
            currentPlayers: item.joined_count,
            startTime: item.start_time,
            status: item.status,
            createdAt: item.created_at
        }));
        setTournaments(formattedData);
      }
      setIsLoading(false);
    };

    fetchTournaments();
  }, [searchQuery, statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-destructive text-destructive-foreground animate-pulse';
      case 'upcoming': return 'bg-primary/10 text-primary';
      case 'completed': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };
  
  const renderSkeletons = () => (
    [...Array(3)].map((_, i) => (
        <Card key={i} className="p-6">
            <Skeleton className="h-4 w-1/4 mb-4" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-6" />
            <div className="space-y-3 mb-6">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
            </div>
            <Skeleton className="h-10 w-full" />
        </Card>
    ))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <NeonText as="h1" className="text-3xl md:text-4xl mb-2">Tournaments</NeonText>
        <p className="text-muted-foreground">Join exciting tournaments and compete for prizes</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search tournaments..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
        </div>
        <div className="flex gap-2">
          {['all', 'upcoming', 'live'].map((status) => (
            <Button key={status} variant={statusFilter === status ? 'default' : 'outline'} onClick={() => setStatusFilter(status as any)} size="sm" className={statusFilter === status ? 'bg-gradient-primary' : ''}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
            renderSkeletons()
        ) : tournaments.length > 0 ? (
          tournaments.map((tournament) => (
            <Card key={tournament.id} className="overflow-hidden bg-gradient-card border-card-border hover:shadow-glow-primary transition-all duration-300 hover:-translate-y-1">
              <div className="p-4 pb-0">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(tournament.status)}`}>
                  {tournament.status.toUpperCase()}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-foreground">{tournament.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{tournament.gameName}</p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm"><Trophy className="h-4 w-4 text-primary" /><span className="text-muted-foreground">Prize Pool:</span><span className="font-bold text-success">{formatCurrency(tournament.prizePool)}</span></div>
                  <div className="flex items-center gap-2 text-sm"><DollarSign className="h-4 w-4 text-accent" /><span className="text-muted-foreground">Entry Fee:</span><span className="font-bold">{formatCurrency(tournament.entryFee)}</span></div>
                  <div className="flex items-center gap-2 text-sm"><Users className="h-4 w-4 text-secondary" /><span className="text-muted-foreground">Players:</span><span className="font-bold">{tournament.currentPlayers}/{tournament.maxPlayers}</span></div>
                  <div className="flex items-center gap-2 text-sm"><Clock className="h-4 w-4 text-warning" /><span className="text-muted-foreground">Starts:</span><span className="font-bold">{formatDateTime(tournament.startTime)}</span></div>
                </div>
                <div className="mb-4">
                  <div className="w-full bg-muted rounded-full h-2"><div className="bg-gradient-primary h-2 rounded-full" style={{ width: `${(tournament.currentPlayers / tournament.maxPlayers) * 100}%` }}/></div>
                </div>
                <Link to={ROUTES.TOURNAMENTS.replace(':id', tournament.id)}>
                  <Button className="w-full bg-gradient-primary shadow-glow-primary" disabled={tournament.currentPlayers >= tournament.maxPlayers || tournament.status !== 'upcoming'}>
                    {tournament.status !== 'upcoming' ? tournament.status.toUpperCase() : tournament.currentPlayers >= tournament.maxPlayers ? 'Full' : 'Join Now'}
                  </Button>
                </Link>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <Trophy className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg text-muted-foreground">No tournaments found for this filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
