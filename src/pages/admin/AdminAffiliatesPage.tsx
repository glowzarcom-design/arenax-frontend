// src/pages/admin/AdminAffiliatesPage.tsx

import { useState } from 'react';
import { Share2, Users, TrendingUp, Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { NeonText } from '@/components/ui/NeonText';
import { formatCurrency } from '@/utils/helpers';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from '@/components/ui/input';

export default function AdminAffiliatesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - will be replaced with actual API calls
  const affiliateData = [
    { id: 'promoter1', username: 'ProStreamer', totalReferrals: 150, depositingUsers: 80, withdrawingUsers: 30, totalCommission: 12500 },
    { id: 'promoter2', username: 'GamingGuru', totalReferrals: 120, depositingUsers: 65, withdrawingUsers: 25, totalCommission: 9800 },
    { id: 'promoter3', username: 'YTPlayer', totalReferrals: 95, depositingUsers: 50, withdrawingUsers: 15, totalCommission: 7500 },
    { id: 'promoter4', username: 'InstaGamer', totalReferrals: 70, depositingUsers: 30, withdrawingUsers: 10, totalCommission: 4500 },
  ];

  const filteredData = affiliateData.filter((affiliate) =>
    affiliate.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="mb-8">
        <NeonText as="h1" className="text-3xl md:text-4xl mb-2">
          Affiliate Management
        </NeonText>
        <p className="text-muted-foreground">Track performance of your promoters and affiliates</p>
      </div>
      
      {/* Search */}
      <Card className="p-4 mb-6 bg-gradient-card border-card-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by promoter username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Affiliates Table */}
      <Card className="p-6 bg-gradient-card border-card-border overflow-x-auto">
        <div className="flex items-center gap-3 mb-6">
          <Share2 className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-bold">Promoter Stats</h2>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead>Promoter</TableHead>
              <TableHead className="text-center">Total Referrals</TableHead>
              <TableHead className="text-center">Depositing Users</TableHead>
              <TableHead className="text-center">Withdrawing Users</TableHead>
              <TableHead className="text-right">Total Commission</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((promoter) => (
              <TableRow key={promoter.id} className="border-border/50">
                <TableCell>
                  <p className="font-medium text-primary">{promoter.username}</p>
                </TableCell>
                <TableCell className="text-center font-semibold text-lg">{promoter.totalReferrals}</TableCell>
                <TableCell className="text-center text-muted-foreground">{promoter.depositingUsers}</TableCell>
                <TableCell className="text-center text-muted-foreground">{promoter.withdrawingUsers}</TableCell>
                <TableCell className="text-right font-bold text-success text-lg">
                  {formatCurrency(promoter.totalCommission)}
                </TableCell>
              </TableRow>
            ))}
            {filteredData.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-12">
                  No affiliate data found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}