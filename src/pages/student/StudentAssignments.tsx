import React, { useState, useEffect } from 'react';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { BookOpen, Calendar, Clock, Filter, Search, ArrowRight, CheckCircle2, FileText, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { supabaseService, Assignment } from '@/src/lib/supabaseService';
import { useAuth } from '@/src/context/AuthContext';

export const StudentAssignments = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchAssignments = async () => {
      if (user?.classGroup) {
        try {
          const data = await supabaseService.getAssignments(user.classGroup);
          setAssignments(data);
        } catch (error) {
          console.error('Error fetching assignments:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchAssignments();
  }, [user]);

  const filteredAssignments = assignments.filter(a => 
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <h1 className="text-4xl font-black text-foreground tracking-tight">My Assignments</h1>
          <p className="text-muted-foreground font-medium">Keep track of your coursework and deadlines.</p>
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
              placeholder="Search assignments..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 pl-11 pr-6 rounded-2xl bg-card-bg border border-border focus:border-gold outline-none transition-all w-64 text-sm font-medium"
            />
          </div>
          <Button variant="outline" className="h-12 rounded-2xl px-6 font-bold gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </motion.div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-navy" />
        </div>
      ) : (
        <>
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredAssignments.map((assignment) => {
              const submission = assignment.studentSubmissions?.find(s => s.studentId === user?.id);
              const status = submission ? (submission.grade ? 'Graded' : 'Submitted') : 'Pending';
              
              return (
                <motion.div key={assignment.id} variants={item}>
                  <Card className="group relative overflow-hidden h-full flex flex-col border-2 hover:border-gold/50 transition-all shadow-sm hover:shadow-xl hover:shadow-gold/5 rounded-[2.5rem]">
                    <div className={cn(
                      "absolute top-0 left-0 h-1.5 w-full",
                      assignment.type === 'quiz' ? 'bg-maroon' : assignment.type === 'project' ? 'bg-navy dark:bg-gold' : 'bg-gold/50'
                    )} />
                    
                    <div className="p-8 flex flex-col h-full space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{assignment.type}</span>
                        </div>
                        <span className={cn(
                          "rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-widest shadow-sm",
                          status === 'Pending' ? 'bg-gold/10 text-gold' : 
                          status === 'Submitted' ? 'bg-navy/10 text-navy dark:text-gold' : 'bg-green-500/10 text-green-500'
                        )}>
                          {status}
                        </span>
                      </div>

                      <div className="space-y-2 flex-1">
                        <h3 className="text-xl font-black text-foreground group-hover:text-navy dark:group-hover:text-gold transition-colors leading-tight">
                          {assignment.title}
                        </h3>
                        <p className="text-sm text-muted-foreground font-medium line-clamp-2">
                          {assignment.description}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-6 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gold" />
                            {assignment.dueDate}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gold" />
                            11:59 PM
                          </div>
                        </div>

                        {status === 'Graded' && (
                          <div className="p-4 bg-green-500/5 rounded-2xl border border-green-500/10 flex items-center justify-between">
                            <span className="text-xs font-black text-green-500 uppercase tracking-widest">Final Grade</span>
                            <span className="text-lg font-black text-green-500">{submission?.grade}</span>
                          </div>
                        )}

                        <div className="pt-2">
                          <Button 
                            variant={status === 'Pending' ? 'navy' : 'outline'} 
                            className="w-full h-12 rounded-xl font-black uppercase tracking-widest text-[10px] group/btn"
                          >
                            {status === 'Pending' ? (
                              <>
                                Start Assignment
                                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                              </>
                            ) : (
                              <>
                                View Details
                                <FileText className="ml-2 h-4 w-4" />
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {filteredAssignments.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 flex flex-col items-center justify-center text-center space-y-6"
            >
              <div className="h-32 w-32 bg-muted rounded-[3rem] flex items-center justify-center">
                <CheckCircle2 className="h-16 w-16 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-foreground">All Caught Up!</h3>
                <p className="text-muted-foreground font-medium max-w-xs">
                  You have no pending assignments at the moment. Enjoy your free time!
                </p>
              </div>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};
