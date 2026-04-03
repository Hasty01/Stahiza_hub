import React from 'react';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { PlusCircle, Calendar, Clock, BookOpen } from 'lucide-react';

export const TeacherAssignments = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Create Assignment</h1>
          <p className="text-gray-500">Set new tasks and deadlines for your students.</p>
        </div>
        <Button variant="navy" className="gap-2">
          <PlusCircle className="h-5 w-5" /> View All Assignments
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card title="Assignment Details">
            <form className="space-y-6">
              <Input label="Assignment Title" placeholder="e.g. Newton's Laws Lab Report" required />
              
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Description & Instructions</label>
                <textarea 
                  className="flex min-h-[150px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy dark:border-gray-800 dark:bg-black"
                  placeholder="Provide detailed instructions for the students..."
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Input label="Due Date" type="date" required />
                <Input label="Due Time" type="time" required />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Input label="Total Points" type="number" placeholder="100" required />
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Assignment Category</label>
                  <select className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy dark:border-gray-800 dark:bg-black">
                    <option>Homework</option>
                    <option>Quiz</option>
                    <option>Project</option>
                    <option>Exam</option>
                  </select>
                </div>
              </div>

              <Button type="submit" variant="navy" className="w-full">Create & Publish Assignment</Button>
            </form>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Recent Assignments">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-lg border border-gray-100 p-3 dark:border-gray-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase text-navy">Mathematics</span>
                    <span className="text-[10px] text-gray-500">Oct {10 + i}</span>
                  </div>
                  <h4 className="font-bold text-sm mb-2">Calculus Assignment {i}</h4>
                  <div className="flex items-center gap-2 text-[10px] text-gray-500">
                    <Calendar className="h-3 w-3" /> Due: Oct 25
                    <BookOpen className="h-3 w-3 ml-2" /> 45 Submissions
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-gold/10 border-gold/30">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <Clock className="h-5 w-5 text-gold" /> Quick Tip
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              You can set assignments to auto-publish at a specific date and time. Use the advanced settings to enable this feature.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
