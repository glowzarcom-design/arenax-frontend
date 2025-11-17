import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Plus, Trophy } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NeonText } from '@/components/ui/NeonText';
import { formatCurrency, formatDateTime } from '@/utils/helpers';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabaseClient';
import { Skeleton } from '@/components/ui/skeleton';

// Frontend mein use hone wala type
interface TournamentDisplay {
  id: string;
  title: string;
  gameName: string;
  entryFee: number;
  prizePool: number;
  maxPlayers: number;
  currentPlayers: number;
  startTime: string;
  status: string;
}

export default function AdminMatchesPage() {
  const [formData, setFormData] = useState({
    title: '',
    gameName: 'Free Fire',
    entryFee: '',
    prizePool: '',
    maxPlayers: '',
    startTime: '',
    description: '',
    rules: '',
  });
  const [tournaments, setTournaments] = useState<TournamentDisplay[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Supabase se data fetch karne ka function
  const fetchTournaments = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .order('start_time', { ascending: false });

    if (error) {
      toast.error('Failed to fetch tournaments.');
      console.error(error);
    } else {
        const formattedData: TournamentDisplay[] = data.map(item => ({
            id: item.id,
            title: item.title,
            gameName: item.game_name,
            entryFee: item.entry_fee,
            prizePool: item.prize_pool,
            maxPlayers: item.max_players,
            currentPlayers: item.joined_count,
            startTime: item.start_time,
            status: item.status
        }));
      setTournaments(formattedData);
    }
    setIsLoading(false);
  };

  // Page load hone par data fetch karo
  useEffect(() => {
    fetchTournaments();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateTournament = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Naya tournament Supabase mein insert karo
    const { error } = await supabase.from('matches').insert([
      {
        title: formData.title,
        game_name: formData.gameName,
        entry_fee: Number(formData.entryFee),
        prize_pool: Number(formData.prizePool),
        max_players: Number(formData.maxPlayers),
        start_time: new Date(formData.startTime).toISOString(),
        description: formData.description, // Yeh columns table mein hone chahiye
        rules: formData.rules,           // Yeh columns table mein hone chahiye
      },
    ]);

    if (error) {
      toast.error('Failed to create tournament.');
      console.error('Supabase error:', error);
    } else {
      toast.success('Tournament created successfully!');
      setFormData({ // Form reset karo
        title: '', gameName: 'Free Fire', entryFee: '', prizePool: '', maxPlayers: '', startTime: '', description: '', rules: ''
      });
      fetchTournaments(); // List ko refresh karo
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'text-destructive bg-destructive/10 animate-pulse';
      case 'upcoming': return 'text-primary bg-primary/10';
      case 'completed': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div>
      <div className="mb-8">
        <NeonText as="h1" className="text-3xl md:text-4xl mb-2">Tournament Management</NeonText>
        <p className="text-muted-foreground">Create and manage tournaments</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create Tournament Form */}
        <Card className="p-6 bg-gradient-card border-card-border lg:col-span-1">
          <div className="flex items-center gap-3 mb-6"><Plus className="h-6 w-6 text-primary" /><h2 className="text-xl font-bold">Create Tournament</h2></div>
          <form onSubmit={handleCreateTournament} className="space-y-4">
            <Input name="title" value={formData.title} onChange={handleInputChange} placeholder="Tournament Title" required />
            <Input name="gameName" value={formData.gameName} onChange={handleInputChange} placeholder="e.g., Free Fire" required />
            <Input name="entryFee" type="number" value={formData.entryFee} onChange={handleInputChange} placeholder="Entry Fee (₹)" required />
            <Input name="prizePool" type="number" value={formData.prizePool} onChange={handleInputChange} placeholder="Prize Pool (₹)" required />
            <Input name="maxPlayers" type="number" value={formData.maxPlayers} onChange={handleInputChange} placeholder="Max Players" required />
            <Input name="startTime" type="datetime-local" value={formData.startTime} onChange={handleInputChange} required />
            {/* Description and Rules added to form */}
            <textarea name="description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Description" className="w-full bg-input border border-border rounded-lg p-2 text-sm" />
            <textarea name="rules" value={formData.rules} onChange={(e) => setFormData({...formData, rules: e.target.value})} placeholder="Rules" className="w-full bg-input border border-border rounded-lg p-2 text-sm" />
            <Button type="submit" className="w-full bg-gradient-primary shadow-glow-primary"><Plus className="h-4 w-4 mr-2" />Create Tournament</Button>
          </form>
        </Card>

        {/* All Tournaments Table */}
        <Card className="p-6 bg-gradient-card border-card-border lg:col-span-2">
          <div className="flex items-center gap-3 mb-6"><Trophy className="h-6 w-6 text-secondary" /><h2 className="text-xl font-bold">All Tournaments</h2></div>
          <div className="overflow-x-auto">
            {isLoading ? (
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
                </div>
            ) : (
                <table className="w-full">
                <thead>
                    <tr className="border-b border-border"><th className="text-left py-3 px-2 text-sm font-semibold text-muted-foreground">Title</th><th className="text-left py-3 px-2 text-sm font-semibold text-muted-foreground">Fee/Prize</th><th className="text-left py-3 px-2 text-sm font-semibold text-muted-foreground">Players</th><th className="text-left py-3 px-2 text-sm font-semibold text-muted-foreground">Time</th><th className="text-left py-3 px-2 text-sm font-semibold text-muted-foreground">Status</th></tr>
                </thead>
                <tbody>
                    {tournaments.map((t) => (
                    <tr key={t.id} className="border-b border-border last:border-0">
                        <td className="py-4 px-2"><div><p className="font-medium text-sm">{t.title}</p><p className="text-xs text-muted-foreground">{t.gameName}</p></div></td>
                        <td className="py-4 px-2"><div className="text-sm"><p className="text-accent">{formatCurrency(t.entryFee)}</p><p className="text-success">{formatCurrency(t.prizePool)}</p></div></td>
                        <td className="py-4 px-2 text-sm">{t.currentPlayers}/{t.maxPlayers}</td>
                        <td className="py-4 px-2 text-sm text-muted-foreground">{formatDateTime(t.startTime)}</td>
                        <td className="py-4 px-2"><span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(t.status)}`}>{t.status}</span></td>
                    </tr>
                    ))}
                </tbody>
                </table>
            )}
            {!isLoading && tournaments.length === 0 && <p className="text-center text-muted-foreground py-12">No tournaments created yet.</p>}
          </div>
        </Card>
      </div>
    </div>
  );
}
