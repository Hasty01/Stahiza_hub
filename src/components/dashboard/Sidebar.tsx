import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/src/context/AuthContext';
import { STUDENT_NAV, TEACHER_NAV, ADMIN_NAV, SHARED_NAV } from '@/src/data/navigation';
import { cn } from '@/src/lib/utils';
import { GraduationCap, LogOut, X } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';

import { motion, AnimatePresence } from 'motion/react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const getNavItems = () => {
    if (!user) return [];
    switch (user.role) {
      case 'student': return STUDENT_NAV;
      case 'teacher': return TEACHER_NAV;
      case 'admin': return ADMIN_NAV;
      default: return [];
    }
  };

  const navItems = getNavItems();

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" 
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-72 transform bg-sidebar-bg text-foreground border-r border-border transition-all duration-300 ease-in-out lg:static lg:translate-x-0 shadow-2xl lg:shadow-none',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-20 items-center justify-between px-8 border-b border-border bg-background/50 backdrop-blur-md">
            <Link to="/" className="flex items-center gap-3">
              <div className="h-10 w-10 bg-navy dark:bg-gold rounded-xl flex items-center justify-center text-white dark:text-black shadow-lg shadow-navy/20 dark:shadow-gold/10">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="text-xl font-black tracking-tighter">STAHIZA <span className="text-gold">HUB</span></span>
            </Link>
            <Button variant="ghost" size="icon" className="lg:hidden rounded-full" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button>
          </div>

          <nav className="flex-1 overflow-y-auto py-8 px-6 space-y-10">
            <div className="space-y-2">
              <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-4">Main Menu</p>
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => onClose()}
                    className={cn(
                      'group flex items-center gap-4 rounded-2xl px-4 py-3.5 text-sm font-bold transition-all duration-200 relative overflow-hidden',
                      isActive
                        ? 'bg-navy text-white shadow-lg shadow-navy/20'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="activeNav"
                        className="absolute inset-0 bg-navy -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <item.icon className={cn(
                      'h-5 w-5 transition-transform duration-200 group-hover:scale-110',
                      isActive ? 'text-gold' : 'text-muted-foreground group-hover:text-foreground'
                    )} />
                    {item.name}
                  </Link>
                );
              })}
            </div>

            <div className="space-y-2">
              <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-4">Account</p>
              {SHARED_NAV.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => onClose()}
                    className={cn(
                      'group flex items-center gap-4 rounded-2xl px-4 py-3.5 text-sm font-bold transition-all duration-200 relative overflow-hidden',
                      isActive
                        ? 'bg-navy text-white shadow-lg shadow-navy/20'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="activeNavShared"
                        className="absolute inset-0 bg-navy -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <item.icon className={cn(
                      'h-5 w-5 transition-transform duration-200 group-hover:scale-110',
                      isActive ? 'text-gold' : 'text-muted-foreground group-hover:text-foreground'
                    )} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="p-6 border-t border-border bg-background/30">
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-4 rounded-2xl h-14 px-6 text-muted-foreground hover:text-maroon hover:bg-maroon/10 font-bold transition-all"
              onClick={() => logout()}
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};
