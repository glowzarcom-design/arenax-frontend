import { useState } from 'react';
import { UserPlus, Mail, Shield } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NeonText } from '@/components/ui/NeonText';
import { toast } from 'sonner';

export default function AdminRolesPage() {
  const [inviteData, setInviteData] = useState({
    email: '',
    role: 'viewer',
  });

  // Mock team members data
  const teamMembers = [
    {
      id: '1',
      email: 'manager@arenax.com',
      role: 'tournament_manager',
      status: 'active',
      joinedAt: '2024-01-01',
    },
    {
      id: '2',
      email: 'processor@arenax.com',
      role: 'payment_processor',
      status: 'active',
      joinedAt: '2024-01-05',
    },
    {
      id: '3',
      email: 'viewer@arenax.com',
      role: 'viewer',
      status: 'invited',
      joinedAt: null,
    },
  ];

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API call to send invite
    toast.success(`Invite sent to ${inviteData.email}`);
    setInviteData({ email: '', role: 'viewer' });
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-destructive/10 text-destructive';
      case 'tournament_manager':
        return 'bg-primary/10 text-primary';
      case 'payment_processor':
        return 'bg-accent/10 text-accent';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'text-success' : 'text-warning';
  };

  return (
    <div>
      <div className="mb-8">
        <NeonText as="h1" className="text-3xl md:text-4xl mb-2">
          Team Management
        </NeonText>
        <p className="text-muted-foreground">Invite and manage team members</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Invite Form */}
        <Card className="p-6 bg-gradient-card border-card-border">
          <div className="flex items-center gap-3 mb-6">
            <UserPlus className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-bold">Invite Member</h2>
          </div>

          <form onSubmit={handleInvite} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <Input
                type="email"
                value={inviteData.email}
                onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                placeholder="member@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Role</label>
              <select
                value={inviteData.role}
                onChange={(e) => setInviteData({ ...inviteData, role: e.target.value })}
                className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground"
              >
                <option value="viewer">Viewer</option>
                <option value="tournament_manager">Tournament Manager</option>
                <option value="payment_processor">Payment Processor</option>
              </select>
            </div>

            <div className="p-3 bg-muted rounded-lg text-xs text-muted-foreground space-y-1">
              <p><strong>Viewer:</strong> Read-only access to dashboard</p>
              <p><strong>Tournament Manager:</strong> Create and manage tournaments</p>
              <p><strong>Payment Processor:</strong> Handle withdrawals and payments</p>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-primary shadow-glow-primary"
            >
              <Mail className="h-4 w-4 mr-2" />
              Send Invite
            </Button>
          </form>
        </Card>

        {/* Team Members List */}
        <Card className="p-6 bg-gradient-card border-card-border lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="h-6 w-6 text-secondary" />
            <h2 className="text-xl font-bold">Team Members</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-sm font-semibold text-muted-foreground">Email</th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-muted-foreground">Role</th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-muted-foreground">Joined</th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.map((member) => (
                  <tr key={member.id} className="border-b border-border last:border-0">
                    <td className="py-4 px-2 font-medium text-sm">{member.email}</td>
                    <td className="py-4 px-2">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getRoleBadgeColor(member.role)}`}>
                        {member.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-4 px-2">
                      <span className={`text-sm font-medium ${getStatusColor(member.status)}`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-sm text-muted-foreground">
                      {member.joinedAt || 'Pending'}
                    </td>
                    <td className="py-4 px-2">
                      <Button size="sm" variant="outline">
                        Remove
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
