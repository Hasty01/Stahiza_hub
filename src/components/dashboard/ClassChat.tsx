import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageSquare, ShieldCheck, MoreVertical, Paperclip, Smile, Loader2 } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { useAuth } from '@/src/context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { supabaseService, ChatMessage } from '@/src/lib/supabaseService';

interface ClassChatProps {
  classGroup: string;
}

export const ClassChat = ({ classGroup }: ClassChatProps) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const fetchMessages = async () => {
    try {
      const data = await supabaseService.getChatMessages(classGroup);
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();

    // Set up real-time subscription
    const subscription = supabaseService.subscribeToChat(classGroup, (payload) => {
      if (payload.eventType === 'INSERT') {
        setMessages(prev => [...prev, payload.new as ChatMessage]);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [classGroup]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    try {
      await supabaseService.sendChatMessage({
        channel_id: classGroup,
        sender_id: user.id,
        sender_name: user.name,
        sender_role: user.role,
        text: newMessage,
        class_group: classGroup,
        is_teacher: user.role === 'teacher'
      });
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="flex flex-col h-[650px] bg-card-bg rounded-[2.5rem] border border-border overflow-hidden shadow-2xl shadow-navy/5 dark:shadow-gold/5 animate-fade-in">
      {/* Chat Header */}
      <div className="p-6 border-b border-border bg-background/50 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-navy dark:bg-gold rounded-2xl flex items-center justify-center text-white dark:text-black shadow-lg shadow-navy/20 dark:shadow-gold/10">
            <MessageSquare className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-black tracking-tight text-foreground">Class {classGroup} Hub</h3>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-gold" /> Verified Group
              </p>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="rounded-xl">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-thin">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-navy" />
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {messages.map((msg) => {
              const isOwn = msg.sender_id === user?.id;
              return (
                <motion.div 
                  key={msg.id} 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}
                >
                  <div className={`flex items-center gap-3 mb-2 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className="h-8 w-8 rounded-xl bg-muted overflow-hidden border border-border">
                      <img 
                        src={`https://ui-avatars.com/api/?name=${msg.sender_name}&background=random`} 
                        alt={msg.sender_name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-foreground">{msg.sender_name}</span>
                        {msg.is_teacher && (
                          <span className="px-2 py-0.5 bg-maroon text-white text-[8px] font-black rounded-full uppercase tracking-widest shadow-sm">
                            Teacher
                          </span>
                        )}
                      </div>
                      <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">
                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                  <motion.div 
                    whileHover={{ scale: 1.01 }}
                    className={`max-w-[85%] rounded-3xl px-6 py-4 text-sm font-medium shadow-md transition-all ${
                      isOwn 
                        ? 'bg-navy text-white rounded-tr-none shadow-navy/20' 
                        : 'bg-muted text-foreground rounded-tl-none shadow-black/5'
                    }`}
                  >
                    {msg.text}
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-border bg-background/50 backdrop-blur-md">
        <form onSubmit={handleSendMessage} className="flex items-center gap-3 bg-muted/50 p-2 rounded-3xl border border-border focus-within:border-navy dark:focus-within:border-gold transition-all">
          <Button type="button" variant="ghost" size="icon" className="rounded-2xl text-muted-foreground hover:text-navy dark:hover:text-gold">
            <Paperclip className="h-5 w-5" />
          </Button>
          <input 
            placeholder="Type a message..." 
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium text-foreground placeholder:text-muted-foreground/50 h-12 px-2"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button type="button" variant="ghost" size="icon" className="rounded-2xl text-muted-foreground hover:text-navy dark:hover:text-gold hidden sm:flex">
            <Smile className="h-5 w-5" />
          </Button>
          <Button 
            type="submit" 
            variant={newMessage.trim() ? "navy" : "ghost"} 
            size="icon" 
            className={cn(
              "h-12 w-12 rounded-2xl transition-all duration-300",
              newMessage.trim() ? "shadow-lg shadow-navy/20 scale-100" : "text-muted-foreground scale-90"
            )}
            disabled={!newMessage.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
};
