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

export default function LoginPage() {
  const navigate = useNavigate(); // Iski zaroorat ab nahi hai, par rehne do
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ----- YEH FUNCTION UPDATE HUA HAI -----
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Sirf login function call karo. Navigation App.tsx handle karega.
      await login(formData);
      // toast aur navigate yahan se hata diya gaya hai.
    } catch (error: any) {
      console.error("Login Page Error:", error);
      toast.error(error.message || 'Invalid email or password');
      setIsLoading(false); // Error aane par loading band karna zaroori hai
    }
    // finally block yahan se hata diya gaya hai kyunki success par loading band nahi karna,
    // page navigate ho jayega.
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-hero">
      <Card className="w-full max-w-md p-8 bg-card/50 backdrop-blur-sm border-2 border-border hover:border-primary transition-all duration-500 group relative overflow-hidden shadow-lg hover:shadow-[0_0_50px_rgba(0,255,255,0.6)]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl bg-gradient-to-br from-primary/40 to-secondary/40 -z-10" />
        
        <div className="text-center mb-8 relative z-10">
          <LogoDisplay size="lg" className="justify-center mb-4" />
          <NeonText as="h1" className="text-3xl mb-2">
            Welcome Back
          </NeonText>
          <p className="text-muted-foreground">Log in to your ArenaX account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
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
            <label className="block text-sm font-medium mb-2 text-foreground">Password</label>
            <Input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded" />
              <span className="text-muted-foreground">Remember me</span>
            </label>
            <a href="#" className="text-primary hover:underline">
              Forgot password?
            </a>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-primary shadow-glow-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6 relative z-10">
          Don't have an account?{' '}
          <Link to={ROUTES.SIGNUP} className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </Card>
    </div>
  );
}
