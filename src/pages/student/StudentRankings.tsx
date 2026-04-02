import React from 'react';
import { Card } from '@/src/components/ui/Card';
import { Trophy, Medal, Star, TrendingUp, TrendingDown, Minus, Crown, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

export const StudentRankings = () => {
  const leaderboard = [
    { rank: 1, name: 'Alice Johnson', score: 9850, trend: 'up', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice', class: 'S1' },
    { rank: 2, name: 'Bob Smith', score: 9720, trend: 'down', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob', class: 'S1' },
    { rank: 3, name: 'Charlie Brown', score: 9600, trend: 'up', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie', class: 'S1' },
    { rank: 4, name: 'You', score: 9450, trend: 'stable', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student', isMe: true, class: 'S1' },
    { rank: 5, name: 'David Wilson', score: 9300, trend: 'up', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David', class: 'S1' },
    { rank: 6, name: 'Eve Davis', score: 9150, trend: 'down', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Eve', class: 'S1' },
  ];

  const podiumOrder = [leaderboard[1], leaderboard[0], leaderboard[2]];

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
    <div className="space-y-12 pb-12">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 text-gold border border-gold/20 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
          <Crown className="h-3 w-3" />
          Elite Performers
        </div>
        <h1 className="text-5xl font-black text-foreground tracking-tight">Rankings Leaderboard</h1>
        <p className="text-muted-foreground font-medium max-w-lg mx-auto">
          Celebrating excellence and dedication across all subjects this semester.
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-3 items-end max-w-5xl mx-auto px-4">
        {podiumOrder.map((player, idx) => (
          <motion.div 
            key={player.rank}
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: idx * 0.2, type: "spring", damping: 15 }}
            className={cn(
              "relative flex flex-col items-center group",
              player.rank === 1 ? "order-2 md:-translate-y-8" : player.rank === 2 ? "order-1" : "order-3"
            )}
          >
            <div className="relative mb-6">
              <div className={cn(
                "h-28 w-28 rounded-[2rem] p-1.5 transition-all group-hover:scale-110",
                player.rank === 1 ? "bg-gradient-to-br from-gold via-yellow-200 to-gold shadow-2xl shadow-gold/30" : 
                player.rank === 2 ? "bg-gradient-to-br from-slate-300 via-white to-slate-400 shadow-xl shadow-slate-400/20" : 
                "bg-gradient-to-br from-orange-300 via-white to-orange-500 shadow-xl shadow-orange-500/20"
              )}>
                <div className="h-full w-full rounded-[1.8rem] bg-card-bg overflow-hidden relative">
                  <img src={player.avatar} alt={player.name} className="h-full w-full object-cover" />
                </div>
              </div>
              <div className={cn(
                "absolute -bottom-3 left-1/2 -translate-x-1/2 h-10 w-10 rounded-2xl flex items-center justify-center text-white font-black shadow-lg border-2 border-white dark:border-gray-900",
                player.rank === 1 ? "bg-gold text-black" : player.rank === 2 ? "bg-slate-400" : "bg-orange-500"
              )}>
                {player.rank === 1 ? <Trophy className="h-5 w-5" /> : player.rank}
              </div>
            </div>
            
            <div className="text-center space-y-1">
              <h3 className="text-xl font-black text-foreground">{player.name}</h3>
              <div className="flex flex-col items-center">
                <span className={cn(
                  "text-2xl font-black tracking-tight",
                  player.rank === 1 ? "text-gold" : "text-muted-foreground"
                )}>
                  {player.score.toLocaleString()}
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Points</span>
              </div>
            </div>

            <div className={cn(
              "mt-6 w-full rounded-[2rem] border-2 border-border/50 bg-card-bg/50 backdrop-blur-sm transition-all group-hover:border-gold/30",
              player.rank === 1 ? "h-48" : player.rank === 2 ? "h-36" : "h-28"
            )}>
              <div className="h-full w-full flex items-center justify-center opacity-10">
                <Award className="h-16 w-16" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="p-0 overflow-hidden rounded-[3rem] border-2 shadow-2xl shadow-navy/5">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Rank</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Student</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground text-center">Class</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground text-right">Points</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground text-center">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {leaderboard.map((player) => (
                  <tr 
                    key={player.rank} 
                    className={cn(
                      "transition-colors group",
                      player.isMe ? "bg-navy/5 dark:bg-gold/5" : "hover:bg-muted/30"
                    )}
                  >
                    <td className="px-10 py-5">
                      <span className={cn(
                        "inline-flex h-10 w-10 items-center justify-center rounded-xl font-black text-sm shadow-sm",
                        player.rank === 1 ? "bg-gold text-black" : 
                        player.rank === 2 ? "bg-slate-200 dark:bg-slate-800 text-slate-600" :
                        player.rank === 3 ? "bg-orange-100 dark:bg-orange-900/30 text-orange-600" :
                        "bg-muted text-muted-foreground"
                      )}>
                        {player.rank}
                      </span>
                    </td>
                    <td className="px-10 py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl overflow-hidden border-2 border-border group-hover:border-gold/50 transition-colors">
                          <img src={player.avatar} alt="" className="h-full w-full object-cover" />
                        </div>
                        <div className="space-y-0.5">
                          <span className={cn(
                            "text-sm font-black text-foreground",
                            player.isMe && "text-navy dark:text-gold"
                          )}>
                            {player.name} {player.isMe && '(You)'}
                          </span>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Student ID: #STU-{player.rank}0{player.rank}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-5 text-center">
                      <span className="text-xs font-black text-muted-foreground bg-muted px-3 py-1 rounded-lg">
                        {player.class}
                      </span>
                    </td>
                    <td className="px-10 py-5 text-right font-black text-foreground">
                      {player.score.toLocaleString()}
                    </td>
                    <td className="px-10 py-5">
                      <div className="flex justify-center">
                        {player.trend === 'up' ? (
                          <div className="flex items-center gap-1 text-green-500 font-black text-[10px] uppercase">
                            <TrendingUp className="h-4 w-4" />
                            <span className="hidden sm:inline">Rising</span>
                          </div>
                        ) : player.trend === 'down' ? (
                          <div className="flex items-center gap-1 text-maroon font-black text-[10px] uppercase">
                            <TrendingDown className="h-4 w-4" />
                            <span className="hidden sm:inline">Falling</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-gold font-black text-[10px] uppercase">
                            <Minus className="h-4 w-4" />
                            <span className="hidden sm:inline">Stable</span>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
