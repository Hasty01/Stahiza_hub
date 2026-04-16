import React from 'react';
import { useAuth } from '@/src/context/AuthContext';
import { ClassChat } from '@/src/components/dashboard/ClassChat';
import { ShieldAlert, Clock } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Link } from 'react-router-dom';

export const StudentChat = () => {
  const { user } = useAuth();

  if (!user?.isApproved) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 space-y-6">
        <div className="h-24 w-24 bg-gold/10 text-gold rounded-[2rem] flex items-center justify-center animate-pulse">
          <ShieldAlert className="h-12 w-12" />
        </div>
        <div className="max-w-md space-y-2">
          <h2 className="text-3xl font-black text-foreground tracking-tight">Access Restricted</h2>
          <p className="text-muted-foreground font-medium">
            You must be approved by your teacher for Class <span className="text-gold font-bold">{user?.classGroup}</span> before you can join the group chat.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full text-sm font-bold text-muted-foreground">
            <Clock className="h-4 w-4" /> Status: Pending Approval
          </div>
          <Link to="/student">
            <Button variant="navy" className="font-bold">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-foreground tracking-tight">Class Group Chat</h1>
          <p className="text-muted-foreground font-medium">Connect with your classmates and teachers in {user?.classGroup}</p>
        </div>
      </div>
      
      <ClassChat classGroup={user?.classGroup || 'S1'} />
    </div>
  );
};
