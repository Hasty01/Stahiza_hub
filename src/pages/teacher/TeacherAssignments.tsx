import React, { useState, useEffect } from 'react';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { PlusCircle, Calendar, BookOpen, Loader2 } from 'lucide-react';
import { supabaseService, Assignment } from '@/src/lib/supabaseService';
import { useAuth, ClassGroup } from '@/src/context/AuthContext';

export const TeacherAssignments = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [classGroup, setClassGroup] = useState<ClassGroup>('S1');
  const [type, setType] = useState<'homework' | 'project' | 'quiz'>('homework');

  useEffect(() => {
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
    fetchAssignments();
  }, [user]);

  const handleCreateAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSubmitting(true);

    try {
      const newAssignment = await supabaseService.addAssignment({
        title,
        description,
        dueDate,
        classGroup,
        teacherId: user.id,
        teacherName: user.name,
        type,
        studentSubmissions: []
      });

      setAssignments(prev => [newAssignment, ...prev]);
      setTitle('');
      setDescription('');
      setDueDate('');
    } catch (error) {
      console.error('Error creating assignment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <form className="space-y-6" onSubmit={handleCreateAssignment}>
              <Input 
                label="Assignment Title" 
                placeholder="e.g. Newton's Laws Lab Report" 
                required 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Description & Instructions</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="flex min-h-[150px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy dark:border-gray-800 dark:bg-black"
                  placeholder="Provide detailed instructions for the students..."
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Input 
                  label="Due Date" 
                  type="date" 
                  required 
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Assignment Type</label>
                  <select 
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy dark:border-gray-800 dark:bg-black"
                  >
                    <option value="homework">Homework</option>
                    <option value="project">Project</option>
                    <option value="quiz">Quiz</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Class Group</label>
                  <select 
                    value={classGroup}
                    onChange={(e) => setClassGroup(e.target.value as any)}
                    className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy dark:border-gray-800 dark:bg-black"
                  >
                    <option value="S1">S1</option>
                    <option value="S2">S2</option>
                    <option value="S3">S3</option>
                    <option value="S4">S4</option>
                    <option value="S5">S5</option>
                    <option value="S6">S6</option>
                  </select>
                </div>
              </div>

              <Button type="submit" variant="navy" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Create & Publish Assignment'}
              </Button>
            </form>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Recent Assignments">
            <div className="space-y-4">
              {loading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-navy" />
                </div>
              ) : (
                <>
                  {assignments.map((assignment) => (
                    <div key={assignment.id} className="rounded-lg border border-gray-100 p-3 dark:border-gray-800">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase text-navy">{assignment.type}</span>
                        <span className="text-[10px] text-gray-500">{assignment.classGroup}</span>
                      </div>
                      <h4 className="font-bold text-sm mb-2">{assignment.title}</h4>
                      <div className="flex items-center gap-2 text-[10px] text-gray-500">
                        <Calendar className="h-3 w-3" /> Due: {assignment.dueDate}
                        <BookOpen className="h-3 w-3 ml-2" /> {assignment.studentSubmissions?.length || 0} Submissions
                      </div>
                    </div>
                  ))}
                  {assignments.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">No assignments created yet.</p>
                  )}
                </>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
