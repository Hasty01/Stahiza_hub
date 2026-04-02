import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth, UserRole } from '@/src/context/AuthContext';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { AlertCircle, Loader2 } from 'lucide-react';

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, user } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get role from query param (optional now, but kept for UI context)
  const queryParams = new URLSearchParams(location.search);
  const roleParam = queryParams.get('role') as UserRole;
  
  useEffect(() => {
    if (user) {
      navigate(`/${user.role}`);
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      const success = await login(email, password);
      if (!success) {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during login.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const roleTitle = roleParam ? roleParam.charAt(0).toUpperCase() + roleParam.slice(1) : 'Portal';

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-black text-foreground">Login to <span className="text-gold">{roleTitle}</span></h1>
        <p className="text-sm text-muted-foreground font-medium">Enter your credentials to continue</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-maroon/10 p-3 text-sm font-bold text-maroon border border-maroon/20">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      {isMock && (
        <div className="rounded-lg bg-gold/10 p-4 border border-gold/20 space-y-2">
          <p className="text-xs font-bold text-gold uppercase tracking-wider">Demo Mode Active</p>
          <p className="text-sm text-foreground/80">
            Backend not connected. Use these credentials to explore:
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-card-bg p-2 rounded border border-border/50">
              <p className="text-muted-foreground">Admin:</p>
              <p className="font-mono font-bold">admin@stahiza.com</p>
            </div>
            <div className="bg-card-bg p-2 rounded border border-border/50">
              <p className="text-muted-foreground">Teacher:</p>
              <p className="font-mono font-bold">teacher@stahiza.com</p>
            </div>
            <div className="bg-card-bg p-2 rounded border border-border/50 col-span-2">
              <p className="text-muted-foreground">Student:</p>
              <p className="font-mono font-bold">student@stahiza.com</p>
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground italic">Any password will work.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email Address</label>
          <Input 
            type="email" 
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            autoFocus
            className="bg-card-bg border-border"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Password</label>
          <Input 
            type="password" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        <Button 
          type="submit" 
          className="w-full h-12 text-lg font-bold" 
          variant="navy"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Sign In to Portal'}
        </Button>
      </form>

      <div className="text-center text-sm font-medium space-y-2">
        <div>
          Need to change portal?{' '}
          <Link to="/role-selection" className="font-bold text-gold hover:underline">Change Role</Link>
        </div>
        <div className="text-muted-foreground pt-2 border-t border-border/50">
          Don't have an account?{' '}
          <Link to="/signup" className="font-bold text-navy dark:text-gold hover:underline">Create account</Link>
        </div>
      </div>
    </div>
  );
};
