import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  ArrowRight, 
  Zap,
  MessageSquare,
  FileText,
  Video,
  Trophy,
  UserCog,
  ShieldCheck,
  UserPlus,
  Mail,
  Lock,
  User
} from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { useAuth, UserRole, ClassGroup } from '../context/AuthContext';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student' as UserRole,
    classGroup: 'S1' as ClassGroup
  });
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(
        formData.name,
        formData.email,
        formData.role,
        formData.classGroup,
        formData.password
      );
      // Success is handled by AuthContext (redirect logic in App.tsx)
      navigate(`/${formData.role}`);
    } catch (err: any) {
      alert(err.message || "Registration failed. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-gold selection:text-black">
      {/* 1. Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-navy rounded-xl flex items-center justify-center text-white shadow-lg shadow-navy/20">
              <GraduationCap className="h-7 w-7" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-foreground">STAHIZA <span className="text-gold">HUB</span></span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="outline" size="sm" className="font-bold px-6">Login</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section with Registration Form */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 -z-20">
          <img 
            src="https://images.unsplash.com/photo-1523050853064-dbad350c746d?auto=format&fit=crop&q=80&w=1920" 
            alt="School Background" 
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        </div>

        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl md:text-7xl font-black tracking-tight mb-8 leading-[1] text-foreground">
              Smart Learning. <br />
              <span className="text-gold">Connected School.</span>
            </h1>
            <p className="max-w-xl text-xl text-muted-foreground mb-8 font-medium leading-relaxed">
              The ultimate school management and collaboration hub for <strong>Standard High School Zzana</strong>. Connect with teachers, track your progress, and excel.
            </p>
            <div className="flex gap-4 items-center text-muted-foreground font-bold">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-background bg-muted" />
                ))}
              </div>
              <span>Join 500+ Stahizans</span>
            </div>
          </motion.div>

          {/* Right Side: Signup Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card p-8 rounded-[2.5rem] border border-border shadow-2xl shadow-navy/10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <UserPlus size={120} />
            </div>

            <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
              Get Started <span className="text-gold">Free</span>
            </h2>

            <form onSubmit={handleSignup} className="space-y-4 relative z-10">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input 
                    type="text" 
                    required 
                    placeholder="Enter your name"
                    className="w-full bg-muted/50 border border-border rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-gold outline-none transition-all"
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">School Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input 
                    type="email" 
                    required 
                    placeholder="email@example.com"
                    className="w-full bg-muted/50 border border-border rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-gold outline-none transition-all"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Role</label>
                  <select 
                    className="w-full bg-muted/50 border border-border rounded-xl py-3 px-4 focus:ring-2 focus:ring-gold outline-none transition-all"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value as UserRole})}
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Class</label>
                  <select 
                    className="w-full bg-muted/50 border border-border rounded-xl py-3 px-4 focus:ring-2 focus:ring-gold outline-none transition-all"
                    value={formData.classGroup}
                    onChange={(e) => setFormData({...formData, classGroup: e.target.value as ClassGroup})}
                  >
                    {['S1','S2','S3','S4','S5','S6'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input 
                    type="password" 
                    required 
                    placeholder="••••••••"
                    className="w-full bg-muted/50 border border-border rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-gold outline-none transition-all"
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                variant="navy" 
                className="w-full h-14 text-lg font-bold mt-4 shadow-lg shadow-navy/20"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>

              <p className="text-center text-sm text-muted-foreground mt-4">
                Already have an account? <Link to="/login" className="text-gold font-bold">Login here</Link>
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid & Footer remain the same as before */}
      {/* ... (Features Section) ... */}
    </div>
  );
};