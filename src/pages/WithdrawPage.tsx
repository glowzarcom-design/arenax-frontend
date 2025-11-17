// src/pages/WithdrawPage.tsx

import { useState } from 'react';
import { ArrowUpRight, Banknote, History, Lock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NeonText } from '@/components/ui/NeonText';
import { formatCurrency, formatDateTime } from '@/utils/helpers';
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

export default function WithdrawPage() {
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');

  // Mock data - This should fetch the user's saved payment methods
  const walletBalance = {
    winnings: 2500,
  };

  const savedPaymentMethods = {
    upi1: 'player@upi',
    upi2: 'another@ybl',
    bankName: 'State Bank of India',
    accountNumber: '123456789012',
    ifscCode: 'SBIN0001234',
    isLocked: true, // Assuming methods are saved and locked
  };

  const withdrawHistory = [
    { id: '1', amount: 1000, method: 'player@upi', status: 'completed', date: '2024-01-05T14:00:00' },
    { id: '2', amount: 500, method: '123456789012', status: 'rejected', date: '2024-01-02T11:00:00' },
    { id: '3', amount: 1500, method: 'another@ybl', status: 'pending', date: '2024-01-10T09:00:00' },
  ];

  const handleWithdrawRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const withdrawAmount = parseFloat(amount);
    
    if (!withdrawAmount || withdrawAmount <= 0) {
      toast.error('Please enter a valid amount'); return;
    }
    if (withdrawAmount < 110) {
      toast.error('Minimum withdrawal amount is ₹110'); return;
    }
    if (withdrawAmount > 5000) {
      toast.error('Maximum withdrawal amount is ₹5000'); return;
    }
    if (withdrawAmount > walletBalance.winnings) {
      toast.error('Withdrawal amount cannot exceed winnings balance'); return;
    }
    if (!selectedMethod) {
      toast.error('Please select a payment method'); return;
    }
    
    // TODO: API call to submit withdrawal request
    toast.success(`Withdrawal request for ${formatCurrency(withdrawAmount)} submitted!`);
    setAmount('');
    setSelectedMethod('');
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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <NeonText as="h1" className="text-3xl md:text-4xl mb-2">Withdraw Funds</NeonText>
        <p className="text-muted-foreground">Request a withdrawal of your winnings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-card border-card-border">
          <div className="flex items-center gap-3 mb-6">
            <Banknote className="h-6 w-6 text-primary" /><h2 className="text-xl font-bold">New Request</h2>
          </div>
          <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">Available Winnings Balance</p>
            <p className="text-3xl font-bold text-success">{formatCurrency(walletBalance.winnings)}</p>
          </div>
          <form onSubmit={handleWithdrawRequest} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Withdrawal Amount (₹)</label>
              <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" required />
              <p className="text-xs text-muted-foreground mt-1">Min: ₹110, Max: ₹5000</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Select Payment Method</label>
              {!savedPaymentMethods.isLocked ? (
                 <div className="p-3 bg-warning/10 border border-warning rounded-lg text-sm text-warning">
                  Please add and lock your payment methods in the Wallet page first.
                </div>
              ) : (
                <div className="space-y-2">
                  {savedPaymentMethods.upi1 && (
                    <Button type="button" variant={selectedMethod === 'upi1' ? 'default' : 'outline'} onClick={() => setSelectedMethod('upi1')} className="w-full justify-start">
                      UPI: {savedPaymentMethods.upi1}
                    </Button>
                  )}
                  {savedPaymentMethods.upi2 && (
                    <Button type="button" variant={selectedMethod === 'upi2' ? 'default' : 'outline'} onClick={() => setSelectedMethod('upi2')} className="w-full justify-start">
                      UPI: {savedPaymentMethods.upi2}
                    </Button>
                  )}
                  {savedPaymentMethods.accountNumber && (
                    <Button type="button" variant={selectedMethod === 'bankAccount' ? 'default' : 'outline'} onClick={() => setSelectedMethod('bankAccount')} className="w-full justify-start">
                      Bank: ****{savedPaymentMethods.accountNumber.slice(-4)} ({savedPaymentMethods.bankName})
                    </Button>
                  )}
                </div>
              )}
            </div>
            <Button type="submit" className="w-full bg-gradient-primary shadow-glow-primary" disabled={!savedPaymentMethods.isLocked}>
              <ArrowUpRight className="h-4 w-4 mr-2" /> Submit Request
            </Button>
          </form>
        </Card>

        <Card className="p-6 bg-gradient-card border-card-border">
          <div className="flex items-center gap-3 mb-6">
            <History className="h-6 w-6 text-secondary" /><h2 className="text-xl font-bold">Withdrawal History</h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {withdrawHistory.map((item) => (
                <TableRow key={item.id} className="border-border/50">
                  <TableCell className="font-semibold text-destructive">{formatCurrency(item.amount)}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">{item.method.includes('@') ? 'UPI' : 'Bank'} (...{item.method.slice(-4)})</TableCell>
                  <TableCell className="text-center"><Badge variant={getStatusBadgeVariant(item.status)}>{item.status}</Badge></TableCell>
                  <TableCell className="text-right text-muted-foreground text-xs">{formatDateTime(item.date)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {withdrawHistory.length === 0 && <p className="text-center text-muted-foreground py-12">No withdrawal history.</p>}
        </Card>
      </div>
    </div>
  );
}