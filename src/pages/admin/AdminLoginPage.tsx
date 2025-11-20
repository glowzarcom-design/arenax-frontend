// src/pages/admin/AdminLoginPage.tsx

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { NeonText } from '@/components/ui/NeonText';
import { LogoDisplay } from '@/components/ui/LogoDisplay';
import { toast } from 'sonner';
import { Shield } from 'lucide-react';

export default function AdminLoginPage() {
  const { adminLogin } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!adminLogin) {
        throw new Error("Admin login function not available");
      }
      await adminLogin(formData);
      toast.success('Admin login successful!');
    } catch (error: unknown) { // <-- YEH LINE CHANGE HUI HAI
      let errorMessage = 'Invalid Admin Credentials';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background-elevated">
      <Card className="w-full max-w-md p-8 bg-card border-2 border-border shadow-lg">
        <div className="text-center mb-8">
          <LogoDisplay size="lg" className="justify-center mb-4" />
          <div className="flex items-center justify-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <NeonText as="h1" className="text-3xl">
              Admin Sign-In
            </NeonText>
          </div>
          <p className="text-muted-foreground mt-2">Access the ArenaX control panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">Admin Email</label>
            <Input
              name="email"
              type="email"
              placeholder="admin@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">Password</label>
            <Input
              name="password"
              type="password"
              placeholder="Enter admin password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-primary shadow-glow-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Authenticating...' : 'Sign In'}
          </Button>
        </form>
      </Card>
    </div>
  );
}