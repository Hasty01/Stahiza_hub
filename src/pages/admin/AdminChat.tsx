import React, { useState } from 'react';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Send, ShieldCheck, Lock } from 'lucide-react';

export const AdminChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, user: 'Admin Sarah', text: 'The server maintenance is scheduled for Sunday at 2 AM.', time: '09:00 AM', isMe: false },
    { id: 2, user: 'You', text: 'Confirmed. I will notify the IT department to monitor the backup process.', time: '09:15 AM', isMe: true },
    { id: 3, user: 'Admin Mike', text: 'Don\'t forget to update the SSL certificates before the maintenance starts.', time: '09:30 AM', isMe: false },
  ]);

  return (
    <div className="flex h-[calc(100vh-12rem)] flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-navy p-2 text-white">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Secure Admin Chat</h1>
        </div>
        <span className="rounded-full bg-navy px-3 py-1 text-xs font-medium text-white">Encrypted</span>
      </div>

      <Card className="flex flex-1 flex-col overflow-hidden p-0 border-border bg-card-bg">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
              <div className="flex items-center gap-2 mb-1">
                {!msg.isMe && (
                  <span className="text-xs font-bold flex items-center gap-1 text-foreground">
                    <ShieldCheck className="h-3 w-3" />
                    {msg.user}
                  </span>
                )}
                <span className="text-[10px] text-muted-foreground">{msg.time}</span>
              </div>
              <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                msg.isMe ? 'bg-navy text-white rounded-tr-none' : 'bg-muted rounded-tl-none text-foreground'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border p-4">
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <Input placeholder="Type secure message..." className="flex-1" />
            <Button variant="navy" size="icon">
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};
