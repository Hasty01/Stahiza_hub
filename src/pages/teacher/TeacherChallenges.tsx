import React from 'react';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Trophy, Star, PlusCircle, Users, Clock } from 'lucide-react';

export const TeacherChallenges = () => {
  const challenges = [
    { id: 1, title: 'Math Marathon', participants: 45, reward: '500 Points', status: 'Active', end: '2 days' },
    { id: 2, title: 'Science Fair 2023', participants: 120, reward: '1000 Points', status: 'Draft', end: '15 days' },
    { id: 3, title: 'Speed Reading', participants: 30, reward: '200 Points', status: 'Completed', end: 'Ended' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Manage Challenges</h1>
          <p className="text-gray-500">Create gamified challenges to boost student engagement.</p>
        </div>
        <Button variant="navy" className="gap-2">
          <PlusCircle className="h-5 w-5" /> New Challenge
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {challenges.map((item) => (
          <Card key={item.id} className="relative overflow-hidden group">
            <div className={`absolute top-0 right-0 px-3 py-1 text-[10px] font-bold uppercase rounded-bl-lg ${
              item.status === 'Active' ? 'bg-green-500 text-white' : 
              item.status === 'Draft' ? 'bg-gray-200 text-gray-700' : 'bg-navy text-white'
            }`}>
              {item.status}
            </div>
            
            <div className="space-y-4">
              <div className="rounded-full bg-gold/10 w-12 h-12 flex items-center justify-center">
                <Trophy className="h-6 w-6 text-gold" />
              </div>
              
              <div>
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-xs text-gray-500">Reward: <span className="text-gold font-bold">{item.reward}</span></p>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-4 dark:border-gray-800">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" /> {item.participants} Joined
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" /> {item.end}
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                <Button variant={item.status === 'Active' ? 'maroon' : 'navy'} size="sm" className="flex-1">
                  {item.status === 'Active' ? 'End Now' : 'Publish'}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card title="Challenge Leaderboard (Math Marathon)">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center gap-3">
                <span className="font-bold text-navy">#{i}</span>
                <div className="h-8 w-8 rounded-full bg-gray-200" />
                <span className="font-medium">Student Name {i}</span>
              </div>
              <span className="font-bold text-gold">450 pts</span>
            </div>
          ))}
          <Button variant="ghost" className="w-full text-navy">View Full Leaderboard</Button>
        </div>
      </Card>
    </div>
  );
};
