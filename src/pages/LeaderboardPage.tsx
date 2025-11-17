// src/pages/LeaderboardPage.tsx

import { useState, useEffect } from 'react';
import { Trophy } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { NeonText } from '@/components/ui/NeonText';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatCurrency } from '@/utils/helpers';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from '@/components/ui/skeleton'; // Skeleton import karenge

// Player ka type define karenge
interface LeaderboardPlayer {
  rank: number;
  username: string;
  ign: string;
  winnings: number;
  matchesPlayed: number;
  winRate: number;
  avatar: string;
}

export default function LeaderboardPage() {
  // Dummy data ko state se replace karenge
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardPlayer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Yahan par future me Supabase se data fetch karne ka code aayega
    // Abhi ke liye, 1.5 second ka loading dikha kar empty array set kar denge
    const timer = setTimeout(() => {
      setLeaderboardData([]);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer); // Cleanup
  }, []);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-yellow-400 animate-pulse-neon" />;
    if (rank === 2) return <Trophy className="h-5 w-5 text-gray-300" />;
    if (rank === 3) return <Trophy className="h-5 w-5 text-yellow-600" />;
    return null;
  };
  
  // Loading state ke liye component
  const renderSkeletons = () => (
    [...Array(10)].map((_, i) => (
      <TableRow key={i} className="border-border/50">
        <TableCell><Skeleton className="h-6 w-10" /></TableCell>
        <TableCell><div className="flex items-center gap-3"><Skeleton className="h-10 w-10 rounded-full" /><div className="space-y-2"><Skeleton className="h-4 w-24" /><Skeleton className="h-3 w-16" /></div></div></TableCell>
        <TableCell><Skeleton className="h-6 w-20 ml-auto" /></TableCell>
        <TableCell className="hidden md:table-cell"><Skeleton className="h-6 w-12 mx-auto" /></TableCell>
        <TableCell className="hidden md:table-cell"><Skeleton className="h-6 w-12 ml-auto" /></TableCell>
      </TableRow>
    ))
  );

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <NeonText as="h1" className="text-4xl md:text-5xl mb-4">
          Leaderboard
        </NeonText>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          See who's dominating the arena. Rankings are updated daily.
        </p>
      </div>

      <Card className="p-4 sm:p-6 bg-card/50 backdrop-blur-sm border-2 border-border hover:border-primary transition-all duration-300 shadow-lg hover:shadow-glow-primary relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="w-16 text-center">Rank</TableHead>
              <TableHead>Player</TableHead>
              <TableHead className="text-right">Winnings</TableHead>
              <TableHead className="hidden md:table-cell text-center">Matches</TableHead>
              <TableHead className="hidden md:table-cell text-right">Win Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              renderSkeletons()
            ) : leaderboardData.length > 0 ? (
              leaderboardData.map((player) => (
                <TableRow
                  key={player.rank}
                  className={cn(
                    'border-border/50 transition-colors hover:bg-primary/5',
                    player.rank <= 3 && 'bg-primary/5'
                  )}
                >
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2 font-bold text-lg text-foreground">
                      {getRankIcon(player.rank)}
                      <span>{player.rank}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-border group-hover:border-primary transition-colors">
                        <AvatarImage src={player.avatar} alt={player.username} />
                        <AvatarFallback>{player.ign.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-foreground">{player.username}</p>
                        <p className="text-xs text-muted-foreground">{player.ign}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-semibold text-success">
                    {formatCurrency(player.winnings)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-center text-muted-foreground">
                    {player.matchesPlayed}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-right text-primary">
                    {player.winRate}%
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground h-48">
                  No leaderboard data available yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}