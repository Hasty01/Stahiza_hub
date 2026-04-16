import React from 'react';
import { cn } from '@/src/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ className, title, description, footer, children, ...props }) => {
  return (
    <div
      className={cn(
        'rounded-3xl border border-border bg-card-bg p-6 shadow-sm card-hover animate-fade-in',
        className
      )}
      {...props}
    >
      {(title || description) && (
        <div className="mb-6 space-y-1.5">
          {title && (
            <h3 className="text-2xl font-black leading-none tracking-tight text-foreground">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm font-medium text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      )}
      <div className="text-foreground font-medium">{children}</div>
      {footer && (
        <div className="mt-6 flex items-center pt-6 border-t border-border">
          {footer}
        </div>
      )}
    </div>
  );
};
