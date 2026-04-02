import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { useAuth, UserRole, ClassGroup } from '@/src/context/AuthContext';
import { AlertCircle, Loader2 } from 'lucide-react';

export const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student' as UserRole,
    classGroup: 'S1' as ClassGroup
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      await signup(formData.name, formData.email, formData.role, formData.classGroup, formData.password);
      navigate(`/${formData.role}`);
    } catch (err: any) {
      setError(err.message || 'An error occurred during signup.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const classes: ClassGroup[] = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6'];

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-black text-foreground">Create an Account</h1>
        <p className="text-sm text-muted-foreground">Join STAHIZA HUB today</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-maroon/10 p-3 text-sm font-bold text-maroon border border-maroon/20">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input 
          label="Full Name" 
          placeholder="John Doe" 
          required 
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <Input 
          label="Email" 
          type="email" 
          placeholder="name@example.com" 
          required 
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">I am a...</label>
          <div className="grid grid-cols-3 gap-2">
            {(['student', 'teacher', 'admin'] as UserRole[]).map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setFormData({ ...formData, role })}
                className={`px-3 py-2 text-xs font-bold rounded-lg border transition-all ${
                  formData.role === role 
                    ? 'bg-navy text-white border-navy' 
                    : 'bg-card-bg text-muted-foreground border-border hover:border-gold'
                }`}
              >
                {role.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">
            {formData.role === 'teacher' ? 'Class You Teach' : 'Your Class'}
          </label>
          <div className="grid grid-cols-6 gap-2">
            {classes.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFormData({ ...formData, classGroup: c })}
                className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                  formData.classGroup === c 
                    ? 'bg-gold text-black border-gold' 
                    : 'bg-card-bg text-muted-foreground border-border hover:border-gold'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <Input 
          label="Password" 
          type="password" 
          placeholder="••••••••" 
          required 
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <Button 
          type="submit" 
          className="w-full h-12 font-bold" 
          variant="navy"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Create Account'}
        </Button>
      </form>
      <div className="text-center text-sm font-medium">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-gold hover:underline">Sign In</Link>
      </div>
    </div>
  );
};
