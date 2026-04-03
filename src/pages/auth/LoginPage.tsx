import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth, UserRole, ClassGroup } from '@/src/context/AuthContext';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { AlertCircle } from 'lucide-react';

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const [password, setPassword] = useState('');
  const [classGroup, setClassGroup] = useState<ClassGroup>('S1');
  const [error, setError] = useState('');
  
  // Get role from query param
  const queryParams = new URLSearchParams(location.search);
  const roleParam = queryParams.get('role') as UserRole;
  
  // If no role is selected, redirect to role selection
  useEffect(() => {
    if (!roleParam) {
      navigate('/role-selection');
    }
  }, [roleParam, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = login(roleParam, password, classGroup);
    
    if (success) {
      navigate(`/${roleParam}`);
    } else {
      setError('Invalid password for this role. (Hint: role123)');
    }
  };

  const roleTitle = roleParam ? roleParam.charAt(0).toUpperCase() + roleParam.slice(1) : '';
  const classes: ClassGroup[] = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6'];

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-black text-foreground">Login as <span className="text-gold">{roleTitle}</span></h1>
        <p className="text-sm text-muted-foreground font-medium">Enter your role-specific password to continue</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-maroon/10 p-3 text-sm font-bold text-maroon border border-maroon/20">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Portal Email</label>
          <Input 
            type="email" 
            value={`${roleParam}@stahiza.com`} 
            disabled 
            className="bg-muted/50 border-border opacity-70"
          />
        </div>

        {(roleParam === 'student' || roleParam === 'teacher') && (
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {roleParam === 'teacher' ? 'Class You Teach' : 'Your Class'}
            </label>
            <div className="grid grid-cols-6 gap-2">
              {classes.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setClassGroup(c)}
                  className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                    classGroup === c 
                      ? 'bg-gold text-black border-gold' 
                      : 'bg-card-bg text-muted-foreground border-border hover:border-gold'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Password</label>
          <Input 
            type="password" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            autoFocus
          />
        </div>
        <Button type="submit" className="w-full h-12 text-lg font-bold" variant="navy">Sign In to Portal</Button>
      </form>

      <div className="text-center text-sm font-medium space-y-2">
        <div>
          Wrong portal?{' '}
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
