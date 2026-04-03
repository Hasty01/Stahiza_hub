import React from 'react';
import { Card } from '@/src/components/ui/Card';
import { BookOpen, CheckCircle, Clock, Trophy, ShieldCheck, MessageSquare, AlertCircle, ArrowRight, Star, TrendingUp } from 'lucide-react';
import { useAuth } from '@/src/context/AuthContext';
import { ClassChat } from '@/src/components/dashboard/ClassChat';
import { Button } from '@/src/components/ui/Button';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

export const StudentDashboard = () => {
  const { user } = useAuth();
  
  const stats = [
    { label: 'Courses Enrolled', value: '6', icon: BookOpen, color: 'text-navy', bg: 'bg-navy/10' },
    { label: 'Assignments Done', value: '12', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Pending Tasks', value: '4', icon: Clock, color: 'text-maroon', bg: 'bg-maroon/10' },
    { label: 'Class Rank', value: '#4', icon: Trophy, color: 'text-gold', bg: 'bg-gold/10' },
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
          <h1 className="text-4xl font-black text-foreground tracking-tight">
            Welcome back, <span className="text-gold">{user?.name.split(' ')[0]}</span>!
          </h1>
          <p className="text-muted-foreground font-medium flex items-center gap-2">
            <Star className="h-4 w-4 text-gold fill-gold" />
            You're doing great! Here's your daily overview.
          </p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`px-6 py-3 rounded-[2rem] border-2 flex items-center gap-3 font-black text-xs uppercase tracking-widest shadow-lg ${
            user?.isApproved 
              ? 'bg-green-500/10 text-green-500 border-green-500/20 shadow-green-500/5' 
              : 'bg-gold/10 text-gold border-gold/20 shadow-gold/5'
          }`}
        >
          {user?.isApproved ? (
            <><ShieldCheck className="h-5 w-5" /> Approved Student • Class {user?.classGroup}</>
          ) : (
            <><Clock className="h-5 w-5" /> Pending Approval • Class {user?.classGroup}</>
          )}
        </motion.div>
      </div>

      {!user?.isApproved && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-10 bg-gold/5 border-2 border-gold/20 rounded-[3rem] flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <AlertCircle className="h-32 w-32 text-gold rotate-12" />
          </div>
          <div className="h-20 w-20 bg-gold rounded-3xl flex items-center justify-center text-black shadow-2xl shadow-gold/30 shrink-0">
            <AlertCircle className="h-10 w-10" />
          </div>
          <div className="flex-1 text-center md:text-left relative z-10">
            <h3 className="text-2xl font-black text-foreground mb-2">Waiting for Teacher Verification</h3>
            <p className="text-muted-foreground font-medium max-w-2xl leading-relaxed">
              You've selected Class <span className="font-black text-gold underline underline-offset-4">{user?.classGroup}</span>. 
              Once your teacher approves your request, you'll gain full access to the class hub, resources, and live chat.
            </p>
          </div>
          <Button variant="gold" className="font-black h-14 px-10 rounded-2xl shadow-xl shadow-gold/20 hover:scale-105 transition-transform relative z-10">
            Resend Request
          </Button>
        </motion.div>
      )}

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat) => (
          <motion.div 
            key={stat.label} 
            variants={item}
            whileHover={{ y: -5 }}
            className="p-8 bg-card-bg rounded-[2.5rem] border border-border hover:border-gold transition-all group shadow-sm hover:shadow-xl hover:shadow-gold/5"
          >
            <div className={`rounded-2xl ${stat.bg} p-4 w-fit mb-6 ${stat.color} group-hover:scale-110 transition-transform shadow-inner`}>
              <stat.icon className="h-7 w-7" />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{stat.label}</p>
              <h3 className="text-3xl font-black text-foreground">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          {user?.isApproved ? (
            <ClassChat classGroup={user?.classGroup || 'S1'} />
          ) : (
            <div className="h-[500px] bg-card-bg rounded-[3rem] border-2 border-border border-dashed flex flex-col items-center justify-center text-center p-12 group hover:border-gold/30 transition-colors">
              <div className="h-24 w-24 bg-muted rounded-[2rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <MessageSquare className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-3xl font-black text-foreground mb-3 tracking-tight">Class Hub Locked</h3>
              <p className="text-muted-foreground font-medium max-w-md leading-relaxed">
                The class group chat and collaborative resources are only available to verified students. 
                Please wait for your teacher to approve your enrollment.
              </p>
              <Button variant="outline" className="mt-8 rounded-2xl px-8 h-12 font-bold">
                Learn More about Verification
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-8">
          <Card 
            title="Upcoming Work" 
            description="Your next 3 deadlines"
            footer={
              <Button variant="link" className="w-full justify-between group">
                View all assignments
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            }
          >
            <div className="space-y-6">
              {[
                { title: 'Mathematics Quiz', date: 'Oct 15', priority: 'High' },
                { title: 'English Essay', date: 'Oct 18', priority: 'Medium' },
                { title: 'Physics Lab', date: 'Oct 20', priority: 'High' },
              ].map((task, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="space-y-1">
                    <h4 className="font-black text-foreground group-hover:text-navy dark:group-hover:text-gold transition-colors">{task.title}</h4>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Due: {task.date}
                    </p>
                  </div>
                  <span className={cn(
                    "rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-widest shadow-sm",
                    task.priority === 'High' ? "bg-maroon/10 text-maroon" : "bg-navy/10 text-navy dark:text-gold"
                  )}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card 
            title="Leaderboard" 
            description="Top performers in Class S1"
            className="relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <TrendingUp className="h-24 w-24 text-navy dark:text-gold" />
            </div>
            <div className="space-y-6 relative z-10">
              {[
                { name: 'You', rank: 4, score: 92, trend: 'up' },
                { name: 'Alice Smith', rank: 1, score: 98, trend: 'stable' },
                { name: 'Bob Wilson', rank: 2, score: 95, trend: 'down' },
              ].map((student, i) => (
                <div key={i} className={cn(
                  "flex items-center justify-between p-3 rounded-2xl transition-all",
                  student.name === 'You' ? "bg-navy/5 dark:bg-gold/5 ring-1 ring-navy/10 dark:ring-gold/10" : "hover:bg-muted/50"
                )}>
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "h-10 w-10 rounded-xl flex items-center justify-center font-black text-sm shadow-sm",
                      student.rank === 1 ? "bg-gold text-black" : "bg-muted text-muted-foreground"
                    )}>
                      #{student.rank}
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-sm font-black text-foreground">{student.name}</span>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Score: {student.score}%</p>
                    </div>
                  </div>
                  <div className={cn(
                    "h-2 w-2 rounded-full",
                    student.trend === 'up' ? "bg-green-500" : student.trend === 'down' ? "bg-maroon" : "bg-gold"
                  )} />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
