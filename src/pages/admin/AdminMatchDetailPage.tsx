// src/pages/admin/AdminMatchDetailPage.tsx

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NeonText } from '@/components/ui/NeonText';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { ROUTES } from '@/utils/constants';

export default function AdminMatchDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [match, setMatch] = useState<any>(null);
  const [players, setPlayers] = useState<any[]>([]);
  const [winnerFFId, setWinnerFFId] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMatchData = async () => {
      if (!id) return;
      setIsLoading(true);

      // Fetch match details
      const { data: matchData, error: matchError } = await supabase
        .from('matches')
        .select('*')
        .eq('id', id)
        .single();
      
      if (matchError) {
        toast.error('Failed to load match details.');
        console.error(matchError);
        setIsLoading(false);
        return;
      }
      setMatch(matchData);

      // Fetch joined players' profiles
      const { data: playersData, error: playersError } = await supabase
        .from('match_players')
        .select('profiles(*)')
        .eq('match_id', id);

      if (playersError) {
        toast.error('Failed to load player list.');
        console.error(playersError);
      } else {
        setPlayers(playersData.map(p => p.profiles));
      }

      setIsLoading(false);
    };

    fetchMatchData();
  }, [id]);

  const handleDeclareWinner = async () => {
    if (!winnerFFId) {
      toast.error('Please enter the winner\'s Free Fire ID.');
      return;
    }
    // TODO: Create a Supabase RPC function 'declare_winner'
    // For now, this is just a placeholder
    toast.success(`Winner declared with Free Fire ID: ${winnerFFId}`);
    // await supabase.rpc('declare_winner', { match_id: id, winner_ff_id: winnerFFId });
    navigate(ROUTES.ADMIN_MATCHES);
  };
  
  const handleCancelMatch = async () => {
     // TODO: Create a Supabase RPC function 'cancel_match'
    toast.warning(`Match ${match?.title} has been cancelled.`);
    navigate(ROUTES.ADMIN_MATCHES);
  }

  if (isLoading) {
    return <Skeleton className="h-96 w-full" />;
  }

  return (
    <div>
      <NeonText as="h1" className="text-3xl md:text-4xl mb-4">Manage Tournament</NeonText>
      <p className="text-muted-foreground mb-6">{match?.title}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2">
          <h2 className="text-xl font-bold mb-4">Joined Players ({players.length}/{match?.max_players})</h2>
          <div className="max-h-96 overflow-y-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b"><th className="text-left p-2">Username</th><th className="text-left p-2">In-Game Name (IGN)</th><th className="text-left p-2">Free Fire ID</th></tr></thead>
              <tbody>
                {players.map(player => (
                  <tr key={player.id} className="border-b last:border-0">
                    <td className="p-2">{player.username}</td>
                    <td className="p-2 font-mono">{player.ign}</td>
                    <td className="p-2 font-mono">{player.free_fire_id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Actions</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Declare Winner</label>
              <Input 
                value={winnerFFId}
                onChange={(e) => setWinnerFFId(e.target.value)}
                placeholder="Enter Winner's Free Fire ID"
              />
              <Button onClick={handleDeclareWinner} className="w-full mt-2 bg-gradient-primary">Declare Winner</Button>
            </div>
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Other Actions</h3>
              <Button onClick={handleCancelMatch} variant="destructive" className="w-full">Cancel Match</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
