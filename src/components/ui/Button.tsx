import React from 'react';
import { cn } from '@/src/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold' | 'maroon' | 'navy';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-foreground text-background hover:opacity-90 shadow-sm',
      secondary: 'bg-muted text-foreground hover:bg-muted/80',
      outline: 'border border-border bg-transparent hover:bg-muted text-foreground',
      ghost: 'bg-transparent hover:bg-muted text-foreground',
      gold: 'bg-gold text-black hover:bg-yellow-500 shadow-md shadow-gold/10',
      maroon: 'bg-maroon text-white hover:bg-red-900 shadow-md shadow-maroon/10',
      navy: 'bg-navy text-white hover:bg-blue-900 shadow-md shadow-navy/10',
      link: 'text-navy dark:text-gold underline-offset-4 hover:underline p-0 h-auto',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 py-2',
      lg: 'h-12 px-8 text-lg',
      icon: 'h-10 w-10',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy dark:focus-visible:ring-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 btn-hover whitespace-nowrap',
          variants[variant as keyof typeof variants],
          sizes[size as keyof typeof sizes],
          className
        )}
        {...props}
      />
    );
  }
);
