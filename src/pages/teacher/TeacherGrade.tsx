import React, { useState, useEffect } from 'react';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { CheckCircle, Search, Clock, X, Loader2 } from 'lucide-react';
import { supabaseService, Assignment } from '@/src/lib/supabaseService';
import { useAuth } from '@/src/context/AuthContext';

export const TeacherGrade = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<{ submissionId: string, studentName: string } | null>(null);
  const [grade, setGrade] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchAssignments = async () => {
    if (user) {
      try {
        const data = await supabaseService.getAssignments(undefined, user.id);
        setAssignments(data);
      } catch (error) {
        console.error('Error fetching assignments:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [user]);

  const allSubmissions = assignments.flatMap(a => 
    (a.studentSubmissions || []).map(s => ({
      ...s,
      assignmentId: a.id,
      assignmentTitle: a.title,
      status: s.grade ? 'Graded' : 'Pending'
    }))
  ).sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

  const filteredSubmissions = allSubmissions.filter(s => 
    s.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.assignmentTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGradeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubmission) return;
    setIsSubmitting(true);

    try {
      await supabaseService.gradeAssignment(
        selectedSubmission.submissionId,
        grade,
        feedback
      );

      await fetchAssignments();
      setSelectedSubmission(null);
      setGrade('');
      setFeedback('');
    } catch (error) {
      console.error('Error grading assignment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Grade Submissions</h1>
          <p className="text-gray-500">Review and grade your students' work.</p>
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search student or assignment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-md bg-gray-100 pl-10 pr-4 text-sm focus:outline-none dark:bg-gray-800"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-navy" />
            </div>
          ) : (
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
                {filteredSubmissions.map((sub, idx) => (
                  <tr key={`${sub.assignmentId}-${sub.studentId}-${idx}`} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-navy/10 flex items-center justify-center font-bold text-navy">
                          {sub.studentName.charAt(0)}
                        </div>
                        <span className="font-medium">{sub.studentName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">{sub.assignmentTitle}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{new Date(sub.submittedAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold uppercase ${
                        sub.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {sub.status === 'Pending' ? <Clock className="h-3 w-3" /> : <CheckCircle className="h-3 w-3" />}
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold">{sub.grade || '-'}</td>
                    <td className="px-6 py-4 text-right">
                      <Button 
                        variant={sub.status === 'Pending' ? 'navy' : 'outline'} 
                        size="sm"
                        onClick={() => {
                          setSelectedSubmission({ submissionId: sub.id, studentName: sub.studentName });
                          setGrade(sub.grade || '');
                          setFeedback(sub.feedback || '');
                        }}
                      >
                        {sub.status === 'Pending' ? 'Grade Now' : 'Edit Grade'}
                      </Button>
                    </td>
                  </tr>
                ))}
                {filteredSubmissions.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-gray-500">No submissions found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </Card>

      {/* Grading Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg p-8 space-y-6 relative">
            <button 
              onClick={() => setSelectedSubmission(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
            
            <h2 className="text-xl font-bold">Grade Submission</h2>
            <p className="text-sm text-gray-500">Grading work for <span className="font-bold text-navy">{selectedSubmission.studentName}</span></p>

            <form onSubmit={handleGradeSubmit} className="space-y-4">
              <Input 
                label="Grade (e.g. 95/100)" 
                placeholder="Enter grade..." 
                required 
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              />
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Feedback</label>
                <textarea 
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="flex min-h-[100px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy dark:border-gray-800 dark:bg-black"
                  placeholder="Provide feedback to the student..."
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setSelectedSubmission(null)}>Cancel</Button>
                <Button type="submit" variant="navy" className="flex-1" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Save Grade'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};
