import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { GraduationCap, Send, Sparkles, Bot, Lightbulb, BookOpen, RotateCcw, User, Zap, Brain, MessageSquare, Info, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

export const StudentAITutor = () => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, role: 'ai', text: 'Hello! I am your AI Tutor. How can I help you with your studies today?', time: '10:00 AM' },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!message.trim()) return;

    const userMsg = {
      id: messages.length + 1,
      role: 'user',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, userMsg]);
    setMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMsg = {
        id: messages.length + 2,
        role: 'ai',
        text: `That's a great question about "${userMsg.text}". In educational terms, we can look at this from several perspectives. Would you like me to explain the core concepts or provide some practice examples?`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const suggestions = [
    "Explain Newton's 2nd Law",
    "Solve x² + 5x + 6 = 0",
    "Summary of WWII",
    "How to write a thesis?"
  ];

  return (
    <div className="flex h-[calc(100vh-12rem)] flex-col gap-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-navy via-navy to-maroon flex items-center justify-center text-white shadow-2xl shadow-navy/20 relative group">
            <div className="absolute inset-0 bg-gold/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <Bot className="h-8 w-8 relative z-10" />
            <div className="absolute -top-1 -right-1 h-4 w-4 bg-gold rounded-full border-2 border-background animate-pulse" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-foreground tracking-tight">AI Tutor</h1>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">System Online • GPT-4o Powered</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setMessages([messages[0]])}
            className="h-11 rounded-xl px-6 font-bold gap-2 border-2 hover:bg-maroon/5 hover:text-maroon hover:border-maroon/20 transition-all"
          >
            <RotateCcw className="h-4 w-4" />
            Reset Session
          </Button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1 overflow-hidden">
        <Card className="lg:col-span-3 flex flex-col overflow-hidden p-0 border-2 rounded-[2.5rem] shadow-2xl shadow-navy/5 bg-card/50 backdrop-blur-xl">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex max-w-[80%] gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={cn(
                      "h-10 w-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg relative",
                      msg.role === 'ai' ? 'bg-gold text-navy' : 'bg-navy text-white'
                    )}>
                      {msg.role === 'ai' ? <Sparkles className="h-5 w-5" /> : <User className="h-5 w-5" />}
                      {msg.role === 'ai' && <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />}
                    </div>
                    <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                      <div className={cn(
                        "rounded-[2rem] px-6 py-4 text-sm leading-relaxed shadow-sm",
                        msg.role === 'user' 
                          ? 'bg-navy text-white rounded-tr-none' 
                          : 'bg-white dark:bg-navy/10 border border-border rounded-tl-none text-foreground'
                      )}>
                        {msg.text}
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-2 px-2">{msg.time}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-2xl bg-gold text-navy flex items-center justify-center shrink-0 shadow-lg">
                      <Sparkles className="h-5 w-5 animate-spin-slow" />
                    </div>
                    <div className="bg-white dark:bg-navy/10 border border-border rounded-[2rem] rounded-tl-none px-6 py-4 shadow-sm">
                      <div className="flex gap-1.5">
                        <motion.span 
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ repeat: Infinity, duration: 1 }}
                          className="h-2 w-2 rounded-full bg-gold"
                        />
                        <motion.span 
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                          className="h-2 w-2 rounded-full bg-gold"
                        />
                        <motion.span 
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                          className="h-2 w-2 rounded-full bg-gold"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="p-6 bg-white/50 dark:bg-navy/5 border-t-2 border-border">
            <form className="flex gap-3 items-center" onSubmit={handleSendMessage}>
              <div className="relative flex-1 group">
                <div className="absolute inset-0 bg-gold/5 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                <Input 
                  placeholder="Ask me anything about your subjects..." 
                  className="h-14 pl-6 pr-12 rounded-2xl bg-white dark:bg-navy/20 border-2 border-border focus-visible:border-gold focus-visible:ring-0 transition-all text-sm font-medium relative z-10"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-gold transition-colors z-10">
                  <Zap className="h-5 w-5" />
                </div>
              </div>
              <Button 
                type="submit" 
                variant="gold" 
                size="icon" 
                disabled={!message.trim() || isTyping}
                className="h-14 w-14 rounded-2xl shadow-xl shadow-gold/20 hover:scale-105 transition-transform shrink-0"
              >
                <Send className="h-6 w-6" />
              </Button>
            </form>
            <div className="mt-4 flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              <span>Markdown Supported</span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span>Voice Input Ready</span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span>Latex Enabled</span>
            </div>
          </div>
        </Card>

        <div className="hidden lg:flex flex-col gap-6">
          <Card className="p-8 rounded-[2rem] border-2 shadow-xl shadow-navy/5 space-y-6">
            <div className="flex items-center gap-3">
              <Lightbulb className="h-5 w-5 text-gold" />
              <h3 className="text-sm font-black uppercase tracking-widest">Quick Prompts</h3>
            </div>
            <div className="space-y-3">
              {suggestions.map((s, i) => (
                <motion.button 
                  key={i}
                  whileHover={{ x: 5 }}
                  onClick={() => setMessage(s)}
                  className="w-full text-left p-4 text-xs font-bold rounded-2xl border-2 border-border hover:border-gold/30 hover:bg-gold/5 transition-all flex items-center justify-between group"
                >
                  <span className="line-clamp-1">{s}</span>
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-gold" />
                </motion.button>
              ))}
            </div>
          </Card>
          
          <Card className="p-8 rounded-[2rem] border-2 shadow-xl shadow-navy/5 space-y-6">
            <div className="flex items-center gap-3">
              <Brain className="h-5 w-5 text-maroon" />
              <h3 className="text-sm font-black uppercase tracking-widest">Learning Tools</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-navy/5 cursor-pointer transition-all group">
                <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest">Summarizer</p>
                  <p className="text-[10px] font-bold text-muted-foreground">Simplify complex text</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-navy/5 cursor-pointer transition-all group">
                <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest">Quiz Gen</p>
                  <p className="text-[10px] font-bold text-muted-foreground">Test your knowledge</p>
                </div>
              </div>
            </div>
          </Card>

          <div className="mt-auto p-6 rounded-[2rem] bg-gradient-to-br from-navy to-navy/80 text-white space-y-4 relative overflow-hidden group">
            <div className="absolute -bottom-4 -right-4 opacity-10 group-hover:scale-110 transition-transform">
              <Info className="h-24 w-24" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-navy-200 relative z-10">Pro Tip</p>
            <p className="text-xs font-medium leading-relaxed relative z-10">
              You can upload your class notes and I can explain them to you in simpler terms!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
