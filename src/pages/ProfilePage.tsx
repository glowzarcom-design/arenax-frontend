import { useState } from 'react';
import { User, Save, Lock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NeonText } from '@/components/ui/NeonText';
import { toast } from 'sonner';

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    username: 'player123',
    email: 'player@example.com',
    avatar: '',
    ign: 'ProGamer', // Non-editable
    freeFireId: 'FF123456', // Non-editable
  });

  const [paymentMethods, setPaymentMethods] = useState({
    upi1: 'player@upi',
    upi2: 'player@bank',
    bankAccount: '1234567890',
    isLocked: false, // Once saved, this becomes true
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!paymentMethods.isLocked) {
      setPaymentMethods({ ...paymentMethods, [e.target.name]: e.target.value });
    }
  };

  const handleSaveProfile = () => {
    // TODO: API call to update profile
    toast.success('Profile updated successfully!');
  };

  const handleSavePaymentMethods = () => {
    if (!paymentMethods.upi1 || !paymentMethods.upi2 || !paymentMethods.bankAccount) {
      toast.error('Please fill all payment methods');
      return;
    }
    // TODO: API call to save payment methods
    setPaymentMethods({ ...paymentMethods, isLocked: true });
    toast.success('Payment methods saved and locked!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <NeonText as="h1" className="text-3xl md:text-4xl mb-2">
          Profile Settings
        </NeonText>
        <p className="text-muted-foreground">Manage your account information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Information */}
        <Card className="p-6 bg-gradient-card border-card-border">
          <div className="flex items-center gap-3 mb-6">
            <User className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-bold">Profile Information</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              <Input
                name="username"
                value={profile.username}
                onChange={handleProfileChange}
                placeholder="Username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                name="email"
                type="email"
                value={profile.email}
                onChange={handleProfileChange}
                placeholder="Email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                In-Game Name (IGN)
                <Lock className="h-3 w-3 text-muted-foreground" />
              </label>
              <Input
                value={profile.ign}
                disabled
                className="bg-muted cursor-not-allowed"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Cannot be changed after initial setup
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                Free Fire ID
                <Lock className="h-3 w-3 text-muted-foreground" />
              </label>
              <Input
                value={profile.freeFireId}
                disabled
                className="bg-muted cursor-not-allowed"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Cannot be changed after initial setup
              </p>
            </div>

            <Button 
              onClick={handleSaveProfile}
              className="w-full bg-gradient-primary shadow-glow-primary"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Profile
            </Button>
          </div>
        </Card>

        {/* Payment Methods */}
        <Card className="p-6 bg-gradient-card border-card-border">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="h-6 w-6 text-accent" />
            <h2 className="text-xl font-bold">Payment Methods</h2>
          </div>

          {paymentMethods.isLocked && (
            <div className="mb-4 p-3 bg-warning/10 border border-warning rounded-lg">
              <p className="text-sm text-warning flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Payment methods are locked and cannot be edited
              </p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">UPI ID 1</label>
              <Input
                name="upi1"
                value={paymentMethods.upi1}
                onChange={handlePaymentChange}
                placeholder="yourname@upi"
                disabled={paymentMethods.isLocked}
                className={paymentMethods.isLocked ? 'bg-muted cursor-not-allowed' : ''}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">UPI ID 2</label>
              <Input
                name="upi2"
                value={paymentMethods.upi2}
                onChange={handlePaymentChange}
                placeholder="yourname@bank"
                disabled={paymentMethods.isLocked}
                className={paymentMethods.isLocked ? 'bg-muted cursor-not-allowed' : ''}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Bank Account Number</label>
              <Input
                name="bankAccount"
                value={paymentMethods.bankAccount}
                onChange={handlePaymentChange}
                placeholder="Account Number"
                disabled={paymentMethods.isLocked}
                className={paymentMethods.isLocked ? 'bg-muted cursor-not-allowed' : ''}
              />
            </div>

            {!paymentMethods.isLocked && (
              <>
                <div className="p-3 bg-info/10 border border-primary rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    ⚠️ Once saved, payment methods cannot be changed. Please verify carefully.
                  </p>
                </div>

                <Button 
                  onClick={handleSavePaymentMethods}
                  className="w-full bg-gradient-secondary shadow-glow-secondary"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Save & Lock Payment Methods
                </Button>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
