// src/pages/admin/AdminPaymentsPage.tsx

import { useState } from 'react';
import { CreditCard, Check, X, History, Copy } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { NeonText } from '@/components/ui/NeonText';
import { formatCurrency, formatDateTime, copyToClipboard } from '@/utils/helpers';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export default function AdminPaymentsPage() {
  // Mock data - with full, unmasked payment details
  const [pendingPayouts, setPendingPayouts] = useState([
    { id: 'wd001', userId: 'usr123', username: 'ShadowStriker', amount: 1500, method: 'player123@ybl', requestedAt: '2024-01-10T11:00:00' },
    { id: 'wd002', userId: 'usr456', username: 'CyberNinja', amount: 2000, method: 'A/C: 9876543210, IFSC: HDFC000123', requestedAt: '2024-01-10T10:30:00' },
  ]);

  const payoutHistory = [
    { id: 'wd003', userId: 'usr789', username: 'ViperX', amount: 1000, method: 'viper@ybl', status: 'completed', processedAt: '2024-01-09T18:00:00' },
    { id: 'wd004', userId: 'usr101', username: 'PhoenixRider', amount: 500, method: 'A/C: 5555666677, IFSC: ICIC000111', status: 'rejected', processedAt: '2024-01-09T17:00:00' },
  ];

  const handleApprove = (payoutId: string) => {
    // TODO: API call to approve withdrawal
    setPendingPayouts(pendingPayouts.filter(p => p.id !== payoutId));
    toast.success(`Payout ${payoutId} approved and is being processed.`);
  };

  const handleReject = (payoutId: string) => {
    // TODO: API call to reject withdrawal
    setPendingPayouts(pendingPayouts.filter(p => p.id !== payoutId));
    toast.error(`Payout ${payoutId} has been rejected.`);
  };
  
  const handleCopy = async (text: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      toast.success('Copied to clipboard!');
    } else {
      toast.error('Failed to copy.');
    }
  };

  const getStatusBadgeVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch(status) {
      case 'completed': return 'default';
      case 'pending': return 'secondary';
      case 'rejected': return 'destructive';
      default: return 'outline';
    }
  }

  return (
    <div>
      <div className="mb-8">
        <NeonText as="h1" className="text-3xl md:text-4xl mb-2">
          Payment Management
        </NeonText>
        <p className="text-muted-foreground">Approve, reject, and view payout history</p>
      </div>

      {/* Pending Payouts */}
      <Card className="p-6 mb-8 bg-gradient-card border-card-border">
        <div className="flex items-center gap-3 mb-6">
          <CreditCard className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-bold">Pending Payouts ({pendingPayouts.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead>User</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="hidden sm:table-cell text-right">Requested At</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingPayouts.map((payout) => (
                <TableRow key={payout.id} className="border-border/50">
                  <TableCell>
                    <p className="font-medium">{payout.username}</p>
                    <p className="text-xs text-muted-foreground">{payout.userId}</p>
                  </TableCell>
                  <TableCell className="text-right font-semibold text-warning">{formatCurrency(payout.amount)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground text-xs">{payout.method}</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleCopy(payout.method)}>
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-right text-muted-foreground text-xs">{formatDateTime(payout.requestedAt)}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex gap-2 justify-center">
                      <Button size="sm" variant="outline" className="text-success border-success hover:bg-success/10" onClick={() => handleApprove(payout.id)}>
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleReject(payout.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {pendingPayouts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-12">
                    No pending payouts.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Payout History */}
      <Card className="p-6 bg-gradient-card border-card-border">
        <div className="flex items-center gap-3 mb-6">
          <History className="h-6 w-6 text-secondary" />
          <h2 className="text-xl font-bold">Payout History</h2>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead>User</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Processed At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payoutHistory.map((payout) => (
                <TableRow key={payout.id} className="border-border/50">
                  <TableCell className="font-medium">{payout.username}</TableCell>
                  <TableCell className="text-right font-semibold">{formatCurrency(payout.amount)}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">{payout.method}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={getStatusBadgeVariant(payout.status)}>{payout.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground text-xs">{formatDateTime(payout.processedAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}