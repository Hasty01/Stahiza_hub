import React from 'react';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { CheckCircle, XCircle, Search, Filter, Download, Clock } from 'lucide-react';

export const TeacherGrade = () => {
  const submissions = [
    { id: 1, student: 'Alice Johnson', assignment: 'Physics Lab Report', date: 'Oct 15', status: 'Pending', score: '-' },
    { id: 2, student: 'Bob Smith', assignment: 'Newton\'s Laws', date: 'Oct 14', status: 'Graded', score: '92/100' },
    { id: 3, student: 'Charlie Brown', assignment: 'Calculus Quiz', date: 'Oct 14', status: 'Pending', score: '-' },
    { id: 4, student: 'David Wilson', assignment: 'Physics Lab Report', date: 'Oct 13', status: 'Graded', score: '85/100' },
    { id: 5, student: 'Eve Davis', assignment: 'Newton\'s Laws', date: 'Oct 12', status: 'Graded', score: '78/100' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Grade Submissions</h1>
          <p className="text-gray-500">Review and grade your students' work.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export Grades
          </Button>
          <Button variant="navy">Grade All Pending</Button>
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search student..."
              className="h-10 w-full rounded-md bg-gray-100 pl-10 pr-4 text-sm focus:outline-none dark:bg-gray-800"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline" size="sm" className="flex-1 md:flex-none gap-2">
              <Filter className="h-4 w-4" /> All Assignments
            </Button>
            <Button variant="outline" size="sm" className="flex-1 md:flex-none gap-2">
              <Filter className="h-4 w-4" /> Status
            </Button>
          </div>
        </div>

        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500">Student</th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500">Assignment</th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500">Submission Date</th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500">Status</th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500">Score</th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {submissions.map((sub) => (
              <tr key={sub.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-navy/10 flex items-center justify-center font-bold text-navy">
                      {sub.student.charAt(0)}
                    </div>
                    <span className="font-medium">{sub.student}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">{sub.assignment}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{sub.date}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold uppercase ${
                    sub.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {sub.status === 'Pending' ? <Clock className="h-3 w-3" /> : <CheckCircle className="h-3 w-3" />}
                    {sub.status}
                  </span>
                </td>
                <td className="px-6 py-4 font-bold">{sub.score}</td>
                <td className="px-6 py-4 text-right">
                  <Button variant={sub.status === 'Pending' ? 'navy' : 'outline'} size="sm">
                    {sub.status === 'Pending' ? 'Grade Now' : 'Edit Grade'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};
