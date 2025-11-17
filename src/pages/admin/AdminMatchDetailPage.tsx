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
import { Loader2 } from 'lucide-react';

export default function AdminMatchDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [match, setMatch] = useState<any>(null);
  const [players, setPlayers] = useState<any[]>([]);
  const [winnerFFId, setWinnerFFId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // ... (useEffect code same rahega)
  }, [id]);

  const handleDeclareWinner = async () => {
    if (!winnerFFId) {
      toast.error('Please enter the winner\'s Free Fire ID.');
      return;
    }
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.rpc('declare_winner', {
        match_id_input: id,
        winner_ff_id: winnerFFId
      });

      if (error) throw new Error(error.message);
      
      toast.success(data);
      navigate(ROUTES.ADMIN_MATCHES);

    } catch (error: any) {
      toast.error(error.message || 'Failed to declare winner.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCancelMatch = async () => {
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.rpc('cancel_match', {
        match_id_to_cancel: id
      });

      if (error) throw new Error(error.message);

      toast.warning(data);
      navigate(ROUTES.ADMIN_MATCHES);

    } catch (error: any) {
      toast.error(error.message || 'Failed to cancel match.');
    } finally {
      setIsSubmitting(false);
    }
  }

  // ... (baaki ka component code same rahega)
  // Bas Buttons mein loading state add kar do
  return (
    <div>
        {/* ... (Title aur player list same rahegi) ... */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Actions</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Declare Winner</label>
              <Input 
                value={winnerFFId}
                onChange={(e) => setWinnerFFId(e.target.value)}
                placeholder="Enter Winner's Free Fire ID"
                disabled={isSubmitting || match?.status === 'completed'}
              />
              <Button onClick={handleDeclareWinner} className="w-full mt-2 bg-gradient-primary" disabled={isSubmitting || match?.status === 'completed'}>
                {isSubmitting ? <Loader2 className="animate-spin" /> : 'Declare Winner'}
              </Button>
            </div>
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Other Actions</h3>
              <Button onClick={handleCancelMatch} variant="destructive" className="w-full" disabled={isSubmitting || match?.status === 'completed'}>
                {isSubmitting ? <Loader2 className="animate-spin" /> : 'Cancel Match'}
              </Button>
            </div>
          </div>
        </Card>
    </div>
  );
}
