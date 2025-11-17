// src/pages/admin/AdminSettingsPage.tsx

import { useState } from 'react';
import { Settings, Save } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NeonText } from '@/components/ui/NeonText';
import { toast } from 'sonner';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    platformFee: '15', // in percentage
    minWithdrawal: '110',
    maxWithdrawal: '5000',
    kycThreshold: '10000',
    razorpayKey: 'rzp_test_XXXXXXXXXXXXXX',
    razorpaySecret: '******************',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API call to save settings
    toast.success('Settings saved successfully!');
  };

  return (
    <div>
      <div className="mb-8">
        <NeonText as="h1" className="text-3xl md:text-4xl mb-2">
          Platform Settings
        </NeonText>
        <p className="text-muted-foreground">Manage global settings for ArenaX</p>
      </div>

      <Card className="p-6 bg-gradient-card border-card-border">
        <div className="flex items-center gap-3 mb-6">
          <Settings className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-bold">General Settings</h2>
        </div>

        <form onSubmit={handleSaveChanges} className="space-y-6 max-w-2xl">
          <div>
            <label className="block text-sm font-medium mb-2">Platform Fee (%)</label>
            <Input
              name="platformFee"
              type="number"
              value={settings.platformFee}
              onChange={handleInputChange}
              placeholder="e.g., 15"
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Percentage fee deducted from the prize pool.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Minimum Withdrawal (₹)</label>
              <Input
                name="minWithdrawal"
                type="number"
                value={settings.minWithdrawal}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Maximum Withdrawal (₹)</label>
              <Input
                name="maxWithdrawal"
                type="number"
                value={settings.maxWithdrawal}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">KYC Threshold (₹)</label>
            <Input
              name="kycThreshold"
              type="number"
              value={settings.kycThreshold}
              onChange={handleInputChange}
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Withdrawals above this amount will require KYC verification.
            </p>
          </div>
          
          <div className="pt-6 border-t border-border/50">
             <h3 className="text-lg font-semibold mb-4">Payment Gateway</h3>
             <div>
                <label className="block text-sm font-medium mb-2">Razorpay Key ID</label>
                <Input
                  name="razorpayKey"
                  value={settings.razorpayKey}
                  onChange={handleInputChange}
                  placeholder="Enter Razorpay Key ID"
                />
             </div>
             <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Razorpay Secret</label>
                <Input
                  name="razorpaySecret"
                  type="password"
                  value={settings.razorpaySecret}
                  onChange={handleInputChange}
                  placeholder="Enter Razorpay Secret"
                />
             </div>
          </div>

          <Button
            type="submit"
            className="w-full sm:w-auto bg-gradient-primary shadow-glow-primary"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </form>
      </Card>
    </div>
  );
}