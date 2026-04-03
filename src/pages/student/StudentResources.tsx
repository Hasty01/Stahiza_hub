import React from 'react';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { FileText, Play, Download, ExternalLink, Search, Filter, Clock, User, ArrowRight, Video, File, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

export const StudentResources = () => {
  const resources = [
    { id: 1, title: 'Introduction to Quantum Physics', type: 'video', duration: '15:20', date: 'Oct 10', instructor: 'Dr. Smith', subject: 'Physics', thumbnail: 'https://picsum.photos/seed/physics/400/225' },
    { id: 2, title: 'Algebraic Equations Cheat Sheet', type: 'pdf', size: '1.2 MB', date: 'Oct 12', instructor: 'Prof. Johnson', subject: 'Mathematics', thumbnail: 'https://picsum.photos/seed/math/400/225' },
    { id: 3, title: 'World History: The Renaissance', type: 'video', duration: '45:00', date: 'Oct 14', instructor: 'Ms. Davis', subject: 'History', thumbnail: 'https://picsum.photos/seed/history/400/225' },
    { id: 4, title: 'Organic Chemistry Lab Notes', type: 'pdf', size: '3.5 MB', date: 'Oct 15', instructor: 'Dr. Miller', subject: 'Chemistry', thumbnail: 'https://picsum.photos/seed/chemistry/400/225' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-10 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-1"
        >
          <h1 className="text-4xl font-black text-foreground tracking-tight">Learning Resources</h1>
          <p className="text-muted-foreground font-medium">Access your notes, videos, and study materials.</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="relative group hidden sm:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-gold transition-colors" />
            <input 
              type="text" 
              placeholder="Search resources..." 
              className="h-12 pl-11 pr-6 rounded-2xl bg-card-bg border border-border focus:border-gold outline-none transition-all w-64 text-sm font-medium"
            />
          </div>
          <Button variant="outline" className="h-12 rounded-2xl px-6 font-bold gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </motion.div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-8 md:grid-cols-2"
      >
        {resources.map((resource) => (
          <motion.div key={resource.id} variants={item}>
            <Card className="group overflow-hidden p-0 rounded-[2.5rem] border-2 hover:border-gold/50 transition-all shadow-sm hover:shadow-xl hover:shadow-gold/5 h-full">
              <div className="flex flex-col sm:flex-row h-full">
                <div className="relative w-full sm:w-48 h-48 sm:h-auto overflow-hidden shrink-0">
                  <img 
                    src={resource.thumbnail} 
                    alt={resource.title} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {resource.type === 'video' ? (
                      <div className="h-12 w-12 rounded-full bg-gold flex items-center justify-center shadow-lg">
                        <Play className="h-6 w-6 text-black fill-current" />
                      </div>
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-maroon flex items-center justify-center shadow-lg">
                        <FileText className="h-6 w-6 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg backdrop-blur-md",
                      resource.type === 'video' ? "bg-navy/80 text-white" : "bg-maroon/80 text-white"
                    )}>
                      {resource.type}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="h-3 w-3 text-gold" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{resource.instructor}</span>
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{resource.date}</span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-foreground group-hover:text-navy dark:group-hover:text-gold transition-colors line-clamp-2 leading-tight">
                      {resource.title}
                    </h3>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{resource.subject}</p>
                  </div>

                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-border">
                    <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                      {resource.type === 'video' ? (
                        <><Clock className="h-3 w-3 text-gold" /> {resource.duration}</>
                      ) : (
                        <><File className="h-3 w-3 text-gold" /> {resource.size}</>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-gold/10 hover:text-gold">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="navy" size="sm" className="h-10 px-6 rounded-xl font-black uppercase tracking-widest text-[10px]">
                        {resource.type === 'video' ? 'Watch' : 'Open'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-navy text-white border-none rounded-[3rem] p-12 relative overflow-hidden group shadow-2xl shadow-navy/20">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Video className="h-64 w-64 text-gold rotate-12" />
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/20 text-gold border border-gold/30 text-[10px] font-black uppercase tracking-[0.2em]">
                <Star className="h-3 w-3 fill-gold" />
                Featured Lecture
              </div>
              <h2 className="text-4xl font-black tracking-tight leading-tight">
                Advanced Calculus: <br />
                <span className="text-gold">Integration Techniques</span>
              </h2>
              <p className="text-navy-100 font-medium text-lg leading-relaxed max-w-md">
                Master complex integration methods with Prof. Richard Feynman in this comprehensive deep-dive session.
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-gold" />
                  <span className="font-bold text-sm">Prof. Richard Feynman</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gold" />
                  <span className="font-bold text-sm">52:14</span>
                </div>
              </div>
              <Button variant="gold" className="h-14 px-10 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-gold/20 hover:scale-105 transition-transform">
                Start Watching Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="aspect-video w-full rounded-[2rem] bg-black/50 flex items-center justify-center relative group/video cursor-pointer overflow-hidden shadow-2xl ring-1 ring-white/10">
              <img 
                src="https://picsum.photos/seed/lecture/1280/720" 
                alt="Lecture Thumbnail" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover/video:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="relative z-10 h-20 w-20 rounded-full bg-gold flex items-center justify-center shadow-2xl group-hover/video:scale-110 transition-transform">
                <Play className="h-10 w-10 text-black fill-current" />
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
