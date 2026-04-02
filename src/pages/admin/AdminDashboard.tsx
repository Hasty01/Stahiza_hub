import React from 'react';
import { Card } from '@/src/components/ui/Card';
import { Users, UserPlus, Bell, ShieldCheck, TrendingUp, DollarSign } from 'lucide-react';

export const AdminDashboard = () => {
  const stats = [
    { label: 'Total Users', value: '1,240', icon: Users, color: 'text-navy' },
    { label: 'New Admissions', value: '45', icon: UserPlus, color: 'text-green-500' },
    { label: 'System Alerts', value: '2', icon: Bell, color: 'text-maroon' },
    { label: 'Revenue', value: '$45,200', icon: DollarSign, color: 'text-gold' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Admin Control Center</h1>
          <p className="text-muted-foreground">Overview of school operations and system health.</p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700 dark:bg-green-900/20">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            System Online
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="flex items-center gap-4 p-4">
            <div className={`rounded-full bg-muted p-3 ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card title="User Distribution" className="lg:col-span-1">
          <div className="space-y-4 pt-4">
            {[
              { label: 'Students', count: 1050, color: 'bg-navy' },
              { label: 'Teachers', count: 120, color: 'bg-maroon' },
              { label: 'Admins', count: 10, color: 'bg-gold' },
              { label: 'Staff', count: 60, color: 'bg-black' },
            ].map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold uppercase text-foreground">
                  <span>{item.label}</span>
                  <span>{item.count}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div 
                    className={`h-full rounded-full ${item.color}`} 
                    style={{ width: `${(item.count / 1240) * 100}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Recent System Logs" className="lg:col-span-2">
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    i === 1 ? 'bg-maroon/10 text-maroon' : 'bg-navy/10 text-navy'
                  }`}>
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">
                      {i === 1 ? 'Failed login attempt' : 'New user registered'}
                    </h4>
                    <p className="text-xs text-muted-foreground">IP: 192.168.1.{10 + i}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{i * 5} mins ago</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
