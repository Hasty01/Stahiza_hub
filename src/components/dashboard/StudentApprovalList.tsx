import React, { useState } from 'react';
import { Check, X, User } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';

export interface PendingStudent {
  id: string;
  name: string;
  email: string;
  classGroup: string;
  requestDate: string;
}

interface StudentApprovalListProps {
  students: PendingStudent[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export const StudentApprovalList = ({ students, onApprove, onReject }: StudentApprovalListProps) => {
  if (students.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center bg-card-bg rounded-3xl border border-border">
        <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <User className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-bold text-foreground">No pending requests</h3>
        <p className="text-sm text-muted-foreground">All student requests have been processed.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {students.map((student) => (
        <div 
          key={student.id} 
          className="flex flex-col sm:flex-row items-center justify-between p-6 bg-card-bg rounded-3xl border border-border hover:border-gold transition-all gap-4"
        >
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="h-12 w-12 bg-navy/10 rounded-xl flex items-center justify-center text-navy">
              <User className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-foreground">{student.name}</h4>
              <p className="text-xs text-muted-foreground">{student.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 bg-gold/10 text-gold text-[10px] font-black rounded-full uppercase">
                  Class {student.classGroup}
                </span>
                <span className="text-[10px] text-muted-foreground">Requested {student.requestDate}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button 
              variant="maroon" 
              size="sm" 
              className="flex-1 sm:flex-none gap-2 font-bold"
              onClick={() => onReject(student.id)}
            >
              <X className="h-4 w-4" /> Reject
            </Button>
            <Button 
              variant="navy" 
              size="sm" 
              className="flex-1 sm:flex-none gap-2 font-bold"
              onClick={() => onApprove(student.id)}
            >
              <Check className="h-4 w-4" /> Approve
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
