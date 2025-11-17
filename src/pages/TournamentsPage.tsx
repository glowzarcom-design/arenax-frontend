import { useState } from 'react';
import { Search, Filter, Trophy, Users, Clock, DollarSign } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NeonText } from '@/components/ui/NeonText';
import { Link } from 'react-router-dom';
import { formatCurrency, formatDateTime } from '@/utils/helpers';
import { ROUTES } from '@/utils/constants';

export default function TournamentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'upcoming' | 'live'>('all');

  // Mock tournaments data - will be replaced with actual API calls
  const tournaments = [
    {
      id: '1',
      title: 'Free Fire Solo Championship',
      gameName: 'Free Fire',
      entryFee: 50,
      prizePool: 5000,
      maxPlayers: 100,
      currentPlayers: 87,
      startTime: '2024-01-15T18:00:00',
      status: 'upcoming' as const,
    },
    {
      id: '2',
      title: 'Squad Battle Royale',
      gameName: 'Free Fire',
      entryFee: 100,
      prizePool: 10000,
      maxPlayers: 50,
      currentPlayers: 50,
      startTime: '2024-01-14T20:00:00',
      status: 'live' as const,
    },
    {
      id: '3',
      title: 'Clash Squad Finals',
      gameName: 'Free Fire',
      entryFee: 75,
      prizePool: 7500,
      maxPlayers: 80,
      currentPlayers: 65,
      startTime: '2024-01-16T19:00:00',
      status: 'upcoming' as const,
    },
  ];

  const filteredTournaments = tournaments.filter((tournament) => {
    const matchesSearch = tournament.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tournament.gameName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tournament.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-destructive text-destructive-foreground';
      case 'upcoming':
        return 'bg-primary/10 text-primary';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <NeonText as="h1" className="text-3xl md:text-4xl mb-2">
          Tournaments
        </NeonText>
        <p className="text-muted-foreground">Join exciting tournaments and compete for prizes</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tournaments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'upcoming', 'live'].map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? 'default' : 'outline'}
              onClick={() => setStatusFilter(status as typeof statusFilter)}
              size="sm"
              className={statusFilter === status ? 'bg-gradient-primary' : ''}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Tournaments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTournaments.map((tournament) => (
          <Card
            key={tournament.id}
            className="overflow-hidden bg-gradient-card border-card-border hover:shadow-glow-primary transition-all duration-300 hover:-translate-y-1"
          >
            {/* Status Badge */}
            <div className="p-4 pb-0">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(tournament.status)}`}>
                {tournament.status.toUpperCase()}
              </span>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-foreground">{tournament.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{tournament.gameName}</p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Trophy className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Prize Pool:</span>
                  <span className="font-bold text-success">{formatCurrency(tournament.prizePool)}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-accent" />
                  <span className="text-muted-foreground">Entry Fee:</span>
                  <span className="font-bold">{formatCurrency(tournament.entryFee)}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-secondary" />
                  <span className="text-muted-foreground">Players:</span>
                  <span className="font-bold">{tournament.currentPlayers}/{tournament.maxPlayers}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-warning" />
                  <span className="text-muted-foreground">Starts:</span>
                  <span className="font-bold">{formatDateTime(tournament.startTime)}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(tournament.currentPlayers / tournament.maxPlayers) * 100}%` }}
                  />
                </div>
              </div>

              <Link to={`${ROUTES.TOURNAMENTS}/${tournament.id}`}>
                <Button
                  className="w-full bg-gradient-primary shadow-glow-primary"
                  disabled={tournament.currentPlayers >= tournament.maxPlayers}
                >
                  {tournament.currentPlayers >= tournament.maxPlayers ? 'Full' : 'Join Now'}
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {filteredTournaments.length === 0 && (
        <div className="text-center py-16">
          <Trophy className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg text-muted-foreground">No tournaments found</p>
        </div>
      )}
    </div>
  );
}
