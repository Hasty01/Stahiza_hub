import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth, UserRole } from '@/src/context/AuthContext';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { AlertCircle, Loader2 } from 'lucide-react';

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginWithGoogle, user, isMock } = useAuth();
  
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

        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border/50" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground font-bold">Or continue with</span>
          </div>
        </div>

        <Button 
          type="button"
          variant="outline"
          className="w-full h-12 font-bold gap-2"
          onClick={() => loginWithGoogle()}
          disabled={isSubmitting}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              fill="#EA4335"
            />
          </svg>
          Sign in with Google
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
