import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  Shield, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  Globe, 
  Zap,
  MessageSquare,
  FileText,
  Video,
  Trophy,
  UserCog,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/src/components/ui/Button';

export const LandingPage = () => {
  const navigate = useNavigate();

  const handleRoleClick = (role: string) => {
    navigate(`/login?role=${role}`);
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
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest">
              <Link to="/admissions" className="text-muted-foreground hover:text-gold transition-colors">Admissions</Link>
              <a href="#features" className="text-muted-foreground hover:text-gold transition-colors">Features</a>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/role-selection">
                <Button variant="navy" size="sm" className="font-bold px-6">Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="relative pt-40 pb-32 px-4 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-navy/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-maroon/20 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[0.9] text-foreground">
              Smart Learning. <br />
              <span className="text-gold">Connected School.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-muted-foreground mb-12 font-medium leading-relaxed">
              The ultimate school management and collaboration hub designed to bridge the gap between students, teachers, and administrators.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/admissions">
                <Button variant="navy" size="lg" className="h-16 px-10 text-xl font-bold gap-3 shadow-xl shadow-navy/30 hover:scale-105 transition-transform">
                  Apply Now <ArrowRight className="h-6 w-6" />
                </Button>
              </Link>
              <Link to="/role-selection">
                <Button variant="outline" size="lg" className="h-16 px-10 text-xl font-bold border-2 hover:bg-white/5 transition-all">
                  Login
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Features */}
      <section id="features" className="py-32 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-foreground">Powerful Features</h2>
            <div className="h-1.5 w-24 bg-gold mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              { icon: Zap, title: "AI Tutor", color: "text-gold", bg: "bg-gold/10" },
              { icon: MessageSquare, title: "Group Messaging", color: "text-navy", bg: "bg-navy/10" },
              { icon: FileText, title: "Assignments & Grading", color: "text-maroon", bg: "bg-maroon/10" },
              { icon: Video, title: "Online Lessons", color: "text-blue-400", bg: "bg-blue-400/10" },
              { icon: Trophy, title: "Rankings", color: "text-yellow-500", bg: "bg-yellow-500/10" }
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 rounded-3xl bg-background border border-border hover:border-gold transition-all text-center group"
              >
                <div className={`h-16 w-16 ${feature.bg} ${feature.color} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-foreground leading-tight">{feature.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Roles */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-foreground">Choose Your Role</h2>
            <p className="text-muted-foreground font-medium">Select your portal to continue</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                id: 'student',
                icon: GraduationCap,
                title: "Student",
                desc: "Access your classes, submit assignments, and chat with your AI tutor.",
                color: "bg-navy",
                shadow: "shadow-navy/20"
              },
              {
                id: 'teacher',
                icon: UserCog,
                title: "Teacher",
                desc: "Manage your curriculum, grade student work, and lead online lessons.",
                color: "bg-maroon",
                shadow: "shadow-maroon/20"
              },
              {
                id: 'admin',
                icon: ShieldCheck,
                title: "Admin",
                desc: "Full control over users, admissions, and school-wide notifications.",
                color: "bg-black",
                shadow: "shadow-black/20"
              }
            ].map((role, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleRoleClick(role.id)}
                className="cursor-pointer p-10 rounded-[2.5rem] bg-muted/30 border border-border hover:border-gold transition-all group"
              >
                <div className={`h-20 w-20 ${role.color} ${role.shadow} rounded-3xl flex items-center justify-center mb-8 group-hover:rotate-6 transition-transform`}>
                  <role.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-3xl font-black mb-4 text-foreground">{role.title}</h3>
                <p className="text-muted-foreground font-medium leading-relaxed mb-8">
                  {role.desc}
                </p>
                <div className="flex items-center gap-2 text-gold font-bold group-hover:gap-4 transition-all">
                  Enter Portal <ArrowRight className="h-5 w-5" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Footer */}
      <footer className="py-20 border-t border-border bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-navy rounded-lg flex items-center justify-center text-white">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="text-xl font-black tracking-tighter text-foreground">STAHIZA <span className="text-gold">HUB</span></span>
            </div>
            
            <div className="flex items-center gap-12 text-sm font-bold uppercase tracking-widest">
              <Link to="/admissions" className="text-muted-foreground hover:text-gold transition-colors">Admissions</Link>
              <Link to="/login" className="text-muted-foreground hover:text-gold transition-colors">Login</Link>
              <Link to="/signup" className="text-muted-foreground hover:text-gold transition-colors">Signup</Link>
            </div>

            <p className="text-sm text-muted-foreground font-medium">
              © 2026 STAHIZA HUB. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
