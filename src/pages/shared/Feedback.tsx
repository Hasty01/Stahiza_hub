import React, { useState } from 'react';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { HelpCircle, Send, CheckCircle, MessageSquare } from 'lucide-react';

export const Feedback = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
        <div className="rounded-full bg-navy/10 p-6">
          <CheckCircle className="h-16 w-16 text-navy" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Thank You!</h1>
        <p className="text-muted-foreground max-w-md">Your feedback has been received. We appreciate your input to help us improve STAHIZA HUB.</p>
        <Button variant="navy" onClick={() => setSubmitted(false)}>Send More Feedback</Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Help & Feedback</h1>
        <p className="text-muted-foreground">Have a question or suggestion? We'd love to hear from you.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="flex flex-col items-center text-center p-6 border-navy/20 bg-card-bg">
          <div className="rounded-full bg-navy/10 p-3 text-navy mb-4">
            <HelpCircle className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-foreground">Help Center</h3>
          <p className="text-xs text-muted-foreground mb-4">Browse our documentation and tutorials.</p>
          <Button variant="outline" size="sm" className="w-full">Visit Help Center</Button>
        </Card>
        <Card className="flex flex-col items-center text-center p-6 border-gold/20 bg-card-bg">
          <div className="rounded-full bg-gold/10 p-3 text-gold mb-4">
            <MessageSquare className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-foreground">Contact Support</h3>
          <p className="text-xs text-muted-foreground mb-4">Get in touch with our support team.</p>
          <Button variant="outline" size="sm" className="w-full">Chat with Support</Button>
        </Card>
      </div>

      <Card title="Send Feedback" className="bg-card-bg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Category</label>
            <select className="flex h-10 w-full rounded-md border border-border bg-card-bg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-navy">
              <option>General Suggestion</option>
              <option>Bug Report</option>
              <option>Feature Request</option>
              <option>Other</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Subject</label>
            <Input placeholder="Briefly describe your feedback" required />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Detailed Description</label>
            <textarea 
              className="flex min-h-[120px] w-full rounded-md border border-border bg-card-bg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-navy"
              placeholder="Tell us more..."
              required
            />
          </div>

          <Button type="submit" variant="navy" className="w-full gap-2">
            <Send className="h-4 w-4" /> Submit Feedback
          </Button>
        </form>
      </Card>
    </div>
  );
};
