import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { NeonText } from '@/components/ui/NeonText';
import { LogoDisplay } from '@/components/ui/LogoDisplay';
import { ROUTES } from '@/utils/constants';
import { toast } from 'sonner';

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    ign: '',
    freeFireId: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    if (!formData.ign || !formData.freeFireId) {
      toast.error('Please fill in all gaming details');
      return;
    }

    setIsLoading(true);
    try {
      const response = await signup({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        ign: formData.ign,
        freeFireId: formData.freeFireId,
      });

      // Naye logic ke hisaab se response message aayega
      toast.success(response.message); 
      
      if (response.message.includes('Login successful')) {
          navigate(ROUTES.DASHBOARD);
      } else {
          // Agar verification email gaya hai toh, user ko wapas login page par bhej do
          navigate(ROUTES.LOGIN); 
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create account. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-hero">
      <Card className="w-full max-w-md p-8 bg-card/50 backdrop-blur-sm border-2 border-border hover:border-secondary transition-all duration-500 group relative overflow-hidden shadow-lg hover:shadow-[0_0_50px_rgba(168,85,247,0.6)]">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl bg-gradient-to-br from-secondary/40 to-accent/40 -z-10" />
        
        <div className="text-center mb-8 relative z-10">
          <LogoDisplay size="lg" className="justify-center mb-4" />
          <NeonText as="h1" className="text-3xl mb-2">
            Join ArenaX
          </NeonText>
          <p className="text-muted-foreground">Create your account and start competing</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">Username</label>
            <Input
              name="username"
              type="text"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">Email</label>
            <Input
              name="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">
              In-Game Name (IGN)
            </label>
            <Input
              name="ign"
              type="text"
              placeholder="Your gaming name"
              value={formData.ign}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">
              Free Fire ID
            </label>
            <Input
              name="freeFireId"
              type="text"
              placeholder="Your Free Fire ID"
              value={formData.freeFireId}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">Password</label>
            <Input
              name="password"
              type="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">
              Confirm Password
            </label>
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-primary shadow-glow-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6 relative z-10">
          Already have an account?{' '}
          <Link to={ROUTES.LOGIN} className="text-primary hover:underline">
            Log in
          </Link>
        </p>
      </Card>
    </div>
  );
}
