import React from 'react';
import { cn } from '@/src/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'flex h-12 w-full rounded-xl border border-border bg-card-bg px-4 py-2 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy dark:focus-visible:ring-gold focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 hover:border-muted-foreground/30',
            error && 'border-maroon focus-visible:ring-maroon',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-[10px] font-bold text-maroon uppercase tracking-wider ml-1 animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);
