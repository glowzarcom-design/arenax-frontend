// src/pages/WalletPage.tsx

import { useState } from 'react';
import { Wallet, PlusCircle, ArrowUpRight, History, Lock, Save } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { NeonText } from '@/components/ui/NeonText';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/utils/constants';
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
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function WalletPage() {
  // Mock data - will be replaced with actual API calls
  const walletBalance = {
    deposit: 1500,
    winnings: 2500,
    total: 4000,
  };

  const transactions = [
    { id: '1', type: 'match_win', amount: 500, status: 'completed', description: 'Free Fire Solo Championship', date: '2024-01-10T10:00:00' },
    { id: '2', type: 'withdraw', amount: -1000, status: 'pending', description: 'Withdrawal Request', date: '2024-01-09T15:30:00' },
    { id: '3', type: 'deposit', amount: 2000, status: 'completed', description: 'Added via UPI', date: '2024-01-08T12:00:00' },
    { id: '4', type: 'match_fee', amount: -50, status: 'completed', description: 'Entry for Squad Battle', date: '2024-01-07T18:00:00' },
    { id: '5', type: 'referral_bonus', amount: 10, status: 'completed', description: 'Bonus from user: gamer456', date: '2024-01-06T09:00:00' },
  ];

  const [paymentMethods, setPaymentMethods] = useState({
    upi1: '',
    upi2: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    isLocked: false,
  });

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!paymentMethods.isLocked) {
      setPaymentMethods({ ...paymentMethods, [e.target.name]: e.target.value });
    }
  };

  const handleSavePaymentMethods = () => {
    const { upi1, upi2, bankName, accountNumber, ifscCode } = paymentMethods;
    
    const hasUpi = upi1 || upi2;
    const hasPartialBank = bankName || accountNumber || ifscCode;
    const hasFullBank = bankName && accountNumber && ifscCode;

    if (!hasUpi && !hasPartialBank) {
      toast.error('Please fill at least one payment method.');
      return;
    }

    if (hasPartialBank && !hasFullBank) {
      toast.error('Please fill all bank details (Name, Account Number, and IFSC).');
      return;
    }

    // TODO: API call to save payment methods
    setPaymentMethods({ ...paymentMethods, isLocked: true });
    toast.success('Payment methods saved and locked!');
  };

  const getTransactionTypeInfo = (type: string) => {
    switch (type) {
      case 'deposit': case 'match_win': case 'referral_bonus': return { color: 'text-success', sign: '+' };
      case 'withdraw': case 'match_fee': return { color: 'text-destructive', sign: '' };
      default: return { color: 'text-muted-foreground', sign: '' };
    }
  };
  
  const getStatusBadgeVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch(status) {
      case 'completed': return 'default';
      case 'pending': return 'secondary';
      case 'failed': return 'destructive';
      default: return 'outline';
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <NeonText as="h1" className="text-3xl md:text-4xl mb-2">My Wallet</NeonText>
        <p className="text-muted-foreground">Manage your funds and transactions</p>
      </div>

      <Card className="p-6 mb-8 bg-card/50 backdrop-blur-sm border-2 border-border hover:border-primary transition-all duration-300 shadow-lg hover:shadow-glow-primary relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          <div className="md:col-span-1 text-center md:text-left flex flex-col justify-center items-center md:items-start p-4 border-b md:border-b-0 md:border-r border-border/50">
            <div className="flex items-center gap-3 mb-2">
              <Wallet className="h-6 w-6 text-primary" />
              <h2 className="text-lg font-semibold text-muted-foreground">Total Balance</h2>
            </div>
            <p className="text-4xl font-bold"><NeonText>{formatCurrency(walletBalance.total)}</NeonText></p>
            <div className="text-xs text-muted-foreground mt-2 space-x-4">
              <span>Deposit: {formatCurrency(walletBalance.deposit)}</span>
              <span>Winnings: {formatCurrency(walletBalance.winnings)}</span>
            </div>
          </div>
          <div className="md:col-span-2 flex flex-col sm:flex-row items-center justify-center gap-4 p-4">
            <Button size="lg" className="w-full sm:w-auto bg-gradient-primary shadow-glow-primary gap-2">
              <PlusCircle /> Add Funds
            </Button>
            <Link to={ROUTES.WITHDRAW} className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full gap-2 hover:border-accent hover:text-accent">
                <ArrowUpRight /> Request Withdraw
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      <Card className="p-6 mb-8 bg-gradient-card border-card-border">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="h-6 w-6 text-accent" />
          <h2 className="text-xl font-bold">Manage Payment Methods</h2>
        </div>
        {paymentMethods.isLocked && (
          <div className="mb-4 p-3 bg-warning/10 border border-warning rounded-lg">
            <p className="text-sm text-warning flex items-center gap-2">
              <Lock className="h-4 w-4" /> Payment methods are locked. Contact support for changes.
            </p>
          </div>
        )}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">UPI ID 1</label>
            <Input name="upi1" value={paymentMethods.upi1} onChange={handlePaymentChange} placeholder="yourname@upi" disabled={paymentMethods.isLocked} className={paymentMethods.isLocked ? 'bg-muted cursor-not-allowed' : ''} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">UPI ID 2 (Optional)</label>
            <Input name="upi2" value={paymentMethods.upi2} onChange={handlePaymentChange} placeholder="yourname@bank" disabled={paymentMethods.isLocked} className={paymentMethods.isLocked ? 'bg-muted cursor-not-allowed' : ''} />
          </div>
          <div className="pt-4 border-t border-border/50">
            <label className="block text-sm font-medium mb-2">Bank Account Details</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input name="bankName" value={paymentMethods.bankName} onChange={handlePaymentChange} placeholder="Bank Name" disabled={paymentMethods.isLocked} className={paymentMethods.isLocked ? 'sm:col-span-3 bg-muted cursor-not-allowed' : 'sm:col-span-3'} />
              <Input name="accountNumber" value={paymentMethods.accountNumber} onChange={handlePaymentChange} placeholder="Account Number" disabled={paymentMethods.isLocked} className={paymentMethods.isLocked ? 'sm:col-span-2 bg-muted cursor-not-allowed' : 'sm:col-span-2'} />
              <Input name="ifscCode" value={paymentMethods.ifscCode} onChange={handlePaymentChange} placeholder="IFSC Code" disabled={paymentMethods.isLocked} className={paymentMethods.isLocked ? 'bg-muted cursor-not-allowed' : ''} />
            </div>
          </div>
          {!paymentMethods.isLocked && (
            <>
              <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                <p className="text-xs text-muted-foreground">⚠️ Once saved, payment methods cannot be changed. Please verify carefully.</p>
              </div>
              <Button onClick={handleSavePaymentMethods} className="w-full bg-gradient-secondary shadow-glow-secondary">
                <Save className="h-4 w-4 mr-2" /> Save & Lock Payment Methods
              </Button>
            </>
          )}
        </div>
      </Card>
      
      <Card className="p-4 sm:p-6 bg-card/50 backdrop-blur-sm border-2 border-border hover:border-secondary transition-all duration-300 shadow-lg hover:shadow-glow-secondary relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <History className="h-6 w-6 text-secondary" /><h2 className="text-xl font-bold">Transaction History</h2>
        </div>
        <div className="relative z-10">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="hidden md:table-cell text-center">Status</TableHead>
                <TableHead className="hidden sm:table-cell text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => {
                const { color, sign } = getTransactionTypeInfo(tx.type);
                return (
                  <TableRow key={tx.id} className="border-border/50 hover:bg-secondary/5">
                    <TableCell>
                      <p className="font-medium text-foreground">{tx.description}</p>
                      <p className="text-xs text-muted-foreground capitalize">{tx.type.replace('_', ' ')}</p>
                    </TableCell>
                    <TableCell className={cn("text-right font-semibold", color)}>{sign}{formatCurrency(Math.abs(tx.amount))}</TableCell>
                    <TableCell className="hidden md:table-cell text-center"><Badge variant={getStatusBadgeVariant(tx.status)}>{tx.status}</Badge></TableCell>
                    <TableCell className="hidden sm:table-cell text-right text-muted-foreground text-xs">{formatDateTime(tx.date)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        {transactions.length === 0 && <p className="text-center text-muted-foreground py-12 relative z-10">No transactions yet.</p>}
      </Card>
    </div>
  );
}