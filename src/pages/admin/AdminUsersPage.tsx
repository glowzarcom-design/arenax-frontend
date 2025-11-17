import { useState } from 'react';
import { Users, Search, Ban, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NeonText } from '@/components/ui/NeonText';
import { formatCurrency } from '@/utils/helpers';
import { toast } from 'sonner';

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock users data
  const users = [
    {
      id: '1',
      username: 'player123',
      email: 'player123@example.com',
      ign: 'ProGamer',
      freeFireId: 'FF123456',
      depositBalance: 1500,
      winningsBalance: 2500,
      totalDeposit: 5000,
      totalWithdraw: 2000,
      matchesPlayed: 25,
      status: 'active',
      isBalanceBlocked: false,
    },
    {
      id: '2',
      username: 'gamer456',
      email: 'gamer456@example.com',
      ign: 'ElitePlayer',
      freeFireId: 'FF789012',
      depositBalance: 500,
      winningsBalance: 1000,
      totalDeposit: 2000,
      totalWithdraw: 500,
      matchesPlayed: 15,
      status: 'active',
      isBalanceBlocked: false,
    },
  ];

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.ign.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBlockBalance = (userId: string, username: string) => {
    // TODO: API call to block balance
    toast.success(`${username}'s balance blocked`);
  };

  const handleUnblockBalance = (userId: string, username: string) => {
    // TODO: API call to unblock balance
    toast.success(`${username}'s balance unblocked`);
  };

  return (
    <div>
      <div className="mb-8">
        <NeonText as="h1" className="text-3xl md:text-4xl mb-2">
          User Management
        </NeonText>
        <p className="text-muted-foreground">Manage platform users and their accounts</p>
      </div>

      {/* Search */}
      <Card className="p-4 mb-6 bg-gradient-card border-card-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users by username, email, or IGN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Users Table */}
      <Card className="p-6 bg-gradient-card border-card-border overflow-x-auto">
        <div className="flex items-center gap-3 mb-6">
          <Users className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-bold">All Users</h2>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 text-sm font-semibold text-muted-foreground">User Info</th>
              <th className="text-left py-3 px-2 text-sm font-semibold text-muted-foreground">Game Info</th>
              <th className="text-left py-3 px-2 text-sm font-semibold text-muted-foreground">Balances</th>
              <th className="text-left py-3 px-2 text-sm font-semibold text-muted-foreground">Activity</th>
              <th className="text-left py-3 px-2 text-sm font-semibold text-muted-foreground">Status</th>
              <th className="text-left py-3 px-2 text-sm font-semibold text-muted-foreground">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-border last:border-0">
                <td className="py-4 px-2">
                  <div>
                    <p className="font-medium text-sm">{user.username}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <div className="text-sm">
                    <p className="font-medium">{user.ign}</p>
                    <p className="text-xs text-muted-foreground">{user.freeFireId}</p>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <div className="text-sm">
                    <p className="text-primary">Deposit: {formatCurrency(user.depositBalance)}</p>
                    <p className="text-success">Winnings: {formatCurrency(user.winningsBalance)}</p>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <div className="text-sm">
                    <p>Deposit: {formatCurrency(user.totalDeposit)}</p>
                    <p>Withdraw: {formatCurrency(user.totalWithdraw)}</p>
                    <p className="text-muted-foreground">Matches: {user.matchesPlayed}</p>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <div className="flex items-center gap-2">
                    <span className={`inline-block w-2 h-2 rounded-full ${
                      user.status === 'active' ? 'bg-success' : 'bg-destructive'
                    }`} />
                    <span className="text-sm capitalize">{user.status}</span>
                  </div>
                  {user.isBalanceBlocked && (
                    <span className="text-xs text-destructive">Balance Blocked</span>
                  )}
                </td>
                <td className="py-4 px-2">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Manage
                    </Button>
                    {user.isBalanceBlocked ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUnblockBalance(user.id, user.username)}
                        className="gap-1"
                      >
                        <CheckCircle className="h-3 w-3" />
                        Unblock
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleBlockBalance(user.id, user.username)}
                        className="gap-1"
                      >
                        <Ban className="h-3 w-3" />
                        Block
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="text-center py-16">
            <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg text-muted-foreground">No users found</p>
          </div>
        )}
      </Card>
    </div>
  );
}
