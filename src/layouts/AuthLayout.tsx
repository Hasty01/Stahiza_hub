import React from 'react';
import { Outlet, Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/src/context/AuthContext';
import { GraduationCap } from 'lucide-react';

export const AuthLayout = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Auth Background Image */}
      <div className="absolute inset-0 -z-10">
        <img 
          src="https://picsum.photos/seed/library-study/1920/1080" 
          alt="Library Study" 
          className="w-full h-full object-cover opacity-10 grayscale-[0.4]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/60 to-background/90" />
        
        {/* Abstract Background Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-navy/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-maroon/20 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center">
          <Link to="/" className="flex items-center gap-3 mb-2 group">
            <div className="h-14 w-14 bg-navy rounded-2xl flex items-center justify-center text-white shadow-xl shadow-navy/20 group-hover:rotate-6 transition-transform">
              <GraduationCap className="h-8 w-8" />
            </div>
            <span className="text-4xl font-black tracking-tighter text-foreground">STAHIZA <span className="text-gold">HUB</span></span>
          </Link>
          <p className="text-muted-foreground font-medium">The ultimate school management platform</p>
        </div>
        
        <div className="rounded-[2.5rem] border border-border bg-muted/30 p-10 shadow-2xl backdrop-blur-sm">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
