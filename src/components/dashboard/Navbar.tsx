import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/src/context/AuthContext';
import { useTheme } from '@/src/context/ThemeContext';
import { Bell, Moon, Sun, Menu, Search, User, GraduationCap } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onMenuClick: () => void;
}

export const Navbar = ({ onMenuClick }: NavbarProps) => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-border bg-background/70 px-4 backdrop-blur-xl lg:px-8">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden rounded-xl hover:bg-muted"
          onClick={onMenuClick}
        >
          <Menu className="h-6 w-6" />
        </Button>
        
        <div className="flex items-center gap-2 lg:hidden">
          <div className="h-10 w-10 bg-navy dark:bg-gold rounded-xl flex items-center justify-center text-white dark:text-black shadow-lg shadow-navy/20 dark:shadow-gold/10">
            <GraduationCap className="h-6 w-6" />
          </div>
          <span className="text-lg font-black tracking-tighter">STAHIZA <span className="text-gold">HUB</span></span>
        </div>

        <div className="relative hidden md:block group">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-navy dark:group-focus-within:text-gold transition-colors" />
          <input
            type="text"
            placeholder="Search STAHIZA HUB..."
            className="h-11 w-72 rounded-2xl border border-border bg-muted/50 pl-11 pr-4 text-sm font-medium transition-all focus:border-navy dark:focus:border-gold focus:bg-background focus:ring-4 focus:ring-navy/5 dark:focus:ring-gold/5 outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-xl hover:bg-muted relative overflow-hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ y: 20, opacity: 0, rotate: 45 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: -20, opacity: 0, rotate: -45 }}
                transition={{ duration: 0.2 }}
              >
                {theme === 'light' ? (
                  <Moon className="h-5 w-5 text-navy" />
                ) : (
                  <Sun className="h-5 w-5 text-gold" />
                )}
              </motion.div>
            </AnimatePresence>
          </Button>
        </motion.div>

        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-muted relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2.5 top-2.5 flex h-2 w-2 rounded-full bg-maroon ring-2 ring-background" />
        </Button>

        <div className="h-8 w-px bg-border mx-1 hidden sm:block" />

        <Link to="/profile" className="group flex items-center gap-3 rounded-2xl p-1.5 pr-4 transition-all hover:bg-muted">
          <div className="relative">
            <div className="h-10 w-10 overflow-hidden rounded-xl border-2 border-border group-hover:border-navy dark:group-hover:border-gold bg-muted transition-all">
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="h-full w-full object-cover" 
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <User className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-background bg-green-500" />
          </div>
          <div className="hidden flex-col text-left sm:flex">
            <span className="text-sm font-black leading-none group-hover:text-navy dark:group-hover:text-gold transition-colors">{user?.name}</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{user?.role}</span>
          </div>
        </Link>
      </div>
    </header>
  );
};
