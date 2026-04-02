import React from 'react';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Bell, PlusCircle, Trash2, Send, Clock } from 'lucide-react';

export const AdminNotifications = () => {
  const notifications = [
    { id: 1, title: 'School Closed for Maintenance', target: 'All Users', date: 'Oct 15', status: 'Published' },
    { id: 2, title: 'Upcoming Sports Day', target: 'Students', date: 'Oct 12', status: 'Published' },
    { id: 3, title: 'Staff Meeting Agenda', target: 'Teachers', date: 'Oct 10', status: 'Draft' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Post Notifications</h1>
          <p className="text-muted-foreground">Send school-wide announcements and alerts.</p>
        </div>
        <Button variant="navy" className="gap-2">
          <PlusCircle className="h-5 w-5" /> New Announcement
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card title="Create Announcement">
            <form className="space-y-6">
              <Input label="Notification Title" placeholder="e.g. Mid-term Exam Schedule" required />
              
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Message Content</label>
                <textarea 
                  className="flex min-h-[150px] w-full rounded-md border border-border bg-card-bg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-navy"
                  placeholder="Type your announcement message here..."
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Target Audience</label>
                  <select className="flex h-10 w-full rounded-md border border-border bg-card-bg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-navy">
                    <option>All Users</option>
                    <option>Students Only</option>
                    <option>Teachers Only</option>
                    <option>Admins Only</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Priority Level</label>
                  <select className="flex h-10 w-full rounded-md border border-border bg-card-bg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-navy">
                    <option>Normal</option>
                    <option>High (Red Banner)</option>
                    <option>Urgent (Push Notification)</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" className="flex-1">Save as Draft</Button>
                <Button variant="navy" className="flex-1 gap-2">
                  <Send className="h-4 w-4" /> Post Announcement
                </Button>
              </div>
            </form>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Recent Announcements">
            <div className="space-y-4">
              {notifications.map((notif) => (
                <div key={notif.id} className="rounded-lg border border-border p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-bold uppercase ${
                      notif.status === 'Published' ? 'text-green-500' : 'text-muted-foreground'
                    }`}>
                      {notif.status}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{notif.date}</span>
                  </div>
                  <h4 className="font-bold text-sm mb-2 text-foreground">{notif.title}</h4>
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Bell className="h-3 w-3" /> {notif.target}
                    </span>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-maroon">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
