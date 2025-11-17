import { useState } from 'react';
import { Plus, Calendar, Users, DollarSign, Trophy } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NeonText } from '@/components/ui/NeonText';
import { formatCurrency, formatDateTime } from '@/utils/helpers';
import { toast } from 'sonner';

export default function AdminMatchesPage() {
  const [formData, setFormData] = useState({
    title: '',
    gameName: '',
    entryFee: '',
    prizePool: '',
    maxPlayers: '',
    startTime: '',
  });

  // Mock tournaments data
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
      status: 'upcoming',
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
      status: 'live',
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateTournament = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API call to create tournament
    toast.success('Tournament created successfully!');
    setFormData({
      title: '',
      gameName: '',
      entryFee: '',
      prizePool: '',
      maxPlayers: '',
      startTime: '',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'text-destructive bg-destructive/10';
      case 'upcoming':
        return 'text-primary bg-primary/10';
      case 'completed':
        return 'text-success bg-success/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div>
      <div className="mb-8">
        <NeonText as="h1" className="text-3xl md:text-4xl mb-2">
          Tournament Management
        </NeonText>
        <p className="text-muted-foreground">Create and manage tournaments</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create Tournament Form */}
        <Card className="p-6 bg-gradient-card border-card-border lg:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <Plus className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-bold">Create Tournament</h2>
          </div>

          <form onSubmit={handleCreateTournament} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Tournament Title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Game Name</label>
              <Input
                name="gameName"
                value={formData.gameName}
                onChange={handleInputChange}
                placeholder="e.g., Free Fire"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Entry Fee (₹)</label>
              <Input
                name="entryFee"
                type="number"
                value={formData.entryFee}
                onChange={handleInputChange}
                placeholder="50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Prize Pool (₹)</label>
              <Input
                name="prizePool"
                type="number"
                value={formData.prizePool}
                onChange={handleInputChange}
                placeholder="5000"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Max Players</label>
              <Input
                name="maxPlayers"
                type="number"
                value={formData.maxPlayers}
                onChange={handleInputChange}
                placeholder="100"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Start Time</label>
              <Input
                name="startTime"
                type="datetime-local"
                value={formData.startTime}
                onChange={handleInputChange}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-primary shadow-glow-primary"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Tournament
            </Button>
          </form>
        </Card>

        {/* All Tournaments Table */}
        <Card className="p-6 bg-gradient-card border-card-border lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="h-6 w-6 text-secondary" />
            <h2 className="text-xl font-bold">All Tournaments</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-sm font-semibold text-muted-foreground">Title</th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-muted-foreground">Fee/Prize</th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-muted-foreground">Players</th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-muted-foreground">Time</th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {tournaments.map((tournament) => (
                  <tr key={tournament.id} className="border-b border-border last:border-0">
                    <td className="py-4 px-2">
                      <div>
                        <p className="font-medium text-sm">{tournament.title}</p>
                        <p className="text-xs text-muted-foreground">{tournament.gameName}</p>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="text-sm">
                        <p className="text-accent">{formatCurrency(tournament.entryFee)}</p>
                        <p className="text-success">{formatCurrency(tournament.prizePool)}</p>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-sm">
                      {tournament.currentPlayers}/{tournament.maxPlayers}
                    </td>
                    <td className="py-4 px-2 text-sm text-muted-foreground">
                      {formatDateTime(tournament.startTime)}
                    </td>
                    <td className="py-4 px-2">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(tournament.status)}`}>
                        {tournament.status}
                      </span>
                    </td>
                    <td className="py-4 px-2">
                      <Button size="sm" variant="outline">
                        Manage
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
