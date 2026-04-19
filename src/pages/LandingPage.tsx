import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  UserPlus, 
  Mail, 
  Lock, 
  User, 
  ChevronRight,
  Zap,
  MessageSquare,
  FileText,
  Trophy
} from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { useAuth, UserRole, ClassGroup } from '../context/AuthContext';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

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
      navigate(`/${formData.role}`);
    } catch (err: any) {
      alert(err.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-background text-foreground selection:bg-gold selection:text-black">
      
      {/* --- FULL PAGE BACKGROUND --- */}
      <div className="fixed inset-0 z-0">
        <img 
          src="http://googleusercontent.com/image_collection/image_retrieval/17010359953984346391_0" 
          alt="Campus Background" 
          className="w-full h-full object-cover grayscale-[20%]"
        />
        {/* Dark Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy/95 via-navy/80 to-background/90" />
      </div>

      <div className="relative z-10">
        {/* 1. Navbar */}
        <nav className="w-full h-20 flex items-center justify-between px-6 lg:px-12 border-b border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gold rounded-lg flex items-center justify-center text-navy shadow-lg">
              <GraduationCap className="h-6 w-6" />
            </div>
            <span className="text-xl font-black tracking-tighter text-white">STAHIZA <span className="text-gold">HUB</span></span>
          </div>
          <Link to="/login">
            <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">Login</Button>
          </Link>
        </nav>

        {/* 2. Hero Section */}
        <main className="max-w-7xl mx-auto px-6 py-12 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Branding */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-gold/20 text-gold text-xs font-bold uppercase tracking-widest mb-6">
              Official Portal: Standard High School Zzana
            </span>
            <h1 className="text-5xl lg:text-7xl font-black leading-tight mb-6">
              The Future of <br />
              <span className="text-gold italic">Stahiza</span> Learning.
            </h1>
            <p className="text-lg text-white/70 max-w-lg mb-8 leading-relaxed">
              Access your digital classroom, collaborate with the ICT Club, and track your academic journey all in one place.
            </p>
            
            <div className="grid grid-cols-2 gap-6 opacity-80">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg"><Zap className="text-gold h-5 w-5" /></div>
                <span className="text-sm font-semibold">AI Tutor</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg"><MessageSquare className="text-gold h-5 w-5" /></div>
                <span className="text-sm font-semibold">Live Chat</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Registration Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2rem] shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              Join the Hub <UserPlus className="text-gold h-5 w-5" />
            </h2>

            <form onSubmit={handleSignup} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <input 
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 text-white focus:border-gold outline-none transition-all"
                      placeholder="John Doe"
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest ml-1">Class</label>
                  <select 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-gold outline-none transition-all"
                    onChange={(e) => setFormData({...formData, classGroup: e.target.value as ClassGroup})}
                  >
                    {['S1','S2','S3','S4','S5','S6'].map(c => <option key={c} value={c} className="bg-navy">{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <input 
                    type="email" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 text-white focus:border-gold outline-none transition-all"
                    placeholder="student@stahiza.com"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest ml-1">Choose Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <input 
                    type="password" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 text-white focus:border-gold outline-none transition-all"
                    placeholder="••••••••"
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full h-12 bg-gold hover:bg-gold/80 text-navy font-bold text-lg rounded-xl mt-4"
              >
                {loading ? "Creating Account..." : "Access Your Portal"}
              </Button>

              <p className="text-center text-sm text-white/40 mt-4">
                By joining, you agree to the ICT Club usage policy.
              </p>
            </form>
          </motion.div>
        </main>
      </div>
    </div>
  );
};