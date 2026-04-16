import React, { useState } from 'react';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Send, ShieldCheck, MessageSquare, Users } from 'lucide-react';
import { useAuth } from '@/src/context/AuthContext';
import { ClassChat } from '@/src/components/dashboard/ClassChat';

export const TeacherChat = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'lounge' | 'class'>('lounge');
  const [messages, setMessages] = useState([
    { id: 1, user: 'Principal Mark', text: 'Good morning teachers. The staff meeting is moved to 3 PM.', time: '08:00 AM', isMe: false, isAdmin: true },
    { id: 2, user: 'You', text: 'Understood. Will the agenda remain the same?', time: '08:15 AM', isMe: true, isAdmin: false },
    { id: 3, user: 'Ms. Alice', text: 'I have some points to add regarding the upcoming sports day.', time: '08:20 AM', isMe: false, isAdmin: false },
  ]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-foreground tracking-tight">Communication Hub</h1>
          <p className="text-muted-foreground font-medium">Connect with fellow teachers or your class group</p>
        </div>
        <div className="flex items-center gap-2 bg-muted/30 p-1 rounded-2xl border border-border">
          <button
            onClick={() => setActiveTab('lounge')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-xl transition-all ${
              activeTab === 'lounge' 
                ? 'bg-maroon text-white shadow-lg shadow-maroon/20' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <ShieldCheck className="h-4 w-4" /> Teacher Lounge
          </button>
          <button
            onClick={() => setActiveTab('class')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-xl transition-all ${
              activeTab === 'class' 
                ? 'bg-navy text-white shadow-lg shadow-navy/20' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Users className="h-4 w-4" /> Class {user?.classGroup}
          </button>
        </div>
      </div>

      {activeTab === 'lounge' ? (
        <Card className="flex h-[600px] flex-col overflow-hidden p-0 border-border bg-card-bg rounded-[2.5rem]">
          <div className="p-6 border-b border-border bg-muted/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-maroon rounded-xl flex items-center justify-center text-white">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Teacher Lounge Chat</h3>
                <p className="text-xs text-muted-foreground">Private channel for staff members only</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                <div className="flex items-center gap-2 mb-1">
                  {!msg.isMe && (
                    <span className={`text-xs font-bold flex items-center gap-1 ${msg.isAdmin ? 'text-maroon' : 'text-navy'}`}>
                      {msg.isAdmin && <ShieldCheck className="h-3 w-3" />}
                      {msg.user}
                    </span>
                  )}
                  <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                </div>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm font-medium shadow-sm ${
                  msg.isMe 
                    ? 'bg-maroon text-white rounded-tr-none' 
                    : 'bg-muted text-foreground rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 border-t border-border bg-muted/30 flex gap-3">
            <Input placeholder="Type your message..." className="flex-1 rounded-full h-12 bg-background border-border" />
            <Button variant="maroon" size="icon" className="h-12 w-12 rounded-full shadow-lg shadow-maroon/20">
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </Card>
      ) : (
        <ClassChat classGroup={user?.classGroup || 'S1'} />
      )}
    </div>
  );
};
