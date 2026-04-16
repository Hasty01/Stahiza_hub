import React, { useState, useEffect } from 'react';
import { Users, UserPlus, MessageSquare, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { StudentApprovalList, PendingStudent } from './StudentApprovalList';
import { ClassChat } from './ClassChat';
import { useAuth } from '@/src/context/AuthContext';
import { supabaseService, UserProfile } from '@/src/lib/supabaseService';

export const TeacherClassDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'approvals' | 'chat' | 'students'>('overview');
  const [pendingStudents, setPendingStudents] = useState<PendingStudent[]>([]);
  const [approvedStudents, setApprovedStudents] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!user?.classGroup) return;
    try {
      setLoading(true);
      const allUsers = await supabaseService.getUsers();
      const classUsers = allUsers.filter(u => u.classGroup === user.classGroup && u.role === 'student');
      
      const pending = classUsers
        .filter(u => !u.isApproved)
        .map(u => ({
          id: u.id,
          name: u.name,
          email: u.email,
          classGroup: u.classGroup || '',
          requestDate: new Date(u.created_at).toLocaleDateString()
        }));
      
      const approved = classUsers.filter(u => u.isApproved);
      
      setPendingStudents(pending);
      setApprovedStudents(approved);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user?.classGroup]);

  const handleApprove = async (id: string) => {
    try {
      await supabaseService.approveUser(id, true);
      await fetchData();
    } catch (error) {
      console.error('Error approving student:', error);
    }
  };

  const handleReject = async (id: string) => {
    // For now, we just remove them from the list locally or we could have a delete method
    setPendingStudents(prev => prev.filter(s => s.id !== id));
  };

  const stats = [
    { label: 'Approved Students', value: approvedStudents.length.toString(), icon: Users, color: 'text-navy', bg: 'bg-navy/10' },
    { label: 'Pending Requests', value: pendingStudents.length.toString(), icon: UserPlus, color: 'text-gold', bg: 'bg-gold/10' },
    { label: 'Class Group', value: user?.classGroup || 'N/A', icon: MessageSquare, color: 'text-maroon', bg: 'bg-maroon/10' },
  ];

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="h-12 w-12 animate-spin text-navy" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-foreground tracking-tight">
            Class <span className="text-gold">{user?.classGroup}</span> Portal
          </h1>
          <p className="text-muted-foreground font-medium">Manage your students and class communication</p>
        </div>
        <div className="flex items-center gap-2 bg-muted/30 p-1 rounded-2xl border border-border">
          {(['overview', 'approvals', 'students', 'chat'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 text-sm font-bold rounded-xl transition-all capitalize ${
                activeTab === tab 
                  ? 'bg-navy text-white shadow-lg shadow-navy/20' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="p-8 bg-card-bg rounded-[2.5rem] border border-border hover:border-gold transition-all group">
                <div className={`h-14 w-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <stat.icon className="h-7 w-7" />
                </div>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-4xl font-black text-foreground">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-8 bg-card-bg rounded-[2.5rem] border border-border space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-foreground flex items-center gap-2">
                  <UserPlus className="h-6 w-6 text-gold" /> Recent Requests
                </h3>
                <Button variant="ghost" size="sm" className="font-bold text-gold" onClick={() => setActiveTab('approvals')}>
                  View All <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
              <StudentApprovalList 
                students={pendingStudents.slice(0, 2)} 
                onApprove={handleApprove} 
                onReject={handleReject} 
              />
            </div>

            <div className="p-8 bg-card-bg rounded-[2.5rem] border border-border space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-foreground flex items-center gap-2">
                  <Users className="h-6 w-6 text-navy" /> Approved Students
                </h3>
                <Button variant="ghost" size="sm" className="font-bold text-navy" onClick={() => setActiveTab('students')}>
                  View All <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
              <div className="space-y-3">
                {approvedStudents.slice(0, 3).map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 bg-muted/20 rounded-2xl border border-border">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-navy/10 rounded-lg flex items-center justify-center text-navy font-bold">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">{student.name}</p>
                        <p className="text-[10px] text-muted-foreground">{student.email}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'approvals' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-8 bg-card-bg rounded-[2.5rem] border border-border space-y-8">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-gold/10 text-gold rounded-2xl flex items-center justify-center">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-foreground">Student Approvals</h2>
                <p className="text-sm text-muted-foreground font-medium">Review and approve students joining Class {user?.classGroup}</p>
              </div>
            </div>
            <StudentApprovalList 
              students={pendingStudents} 
              onApprove={handleApprove} 
              onReject={handleReject} 
            />
          </div>
        </div>
      )}

      {activeTab === 'students' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-8 bg-card-bg rounded-[2.5rem] border border-border space-y-8">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-navy/10 text-navy rounded-2xl flex items-center justify-center">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-foreground">Approved Students</h2>
                <p className="text-sm text-muted-foreground font-medium">Currently enrolled students in Class {user?.classGroup}</p>
              </div>
            </div>
            
            <div className="grid gap-4">
              {approvedStudents.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-6 bg-muted/20 rounded-3xl border border-border hover:border-gold transition-all">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-navy rounded-xl flex items-center justify-center text-white font-black">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{student.name}</h4>
                      <p className="text-xs text-muted-foreground">{student.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="text-[10px] text-muted-foreground uppercase font-black">Joined</p>
                      <p className="text-sm font-bold text-foreground">{new Date((student as any).created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'chat' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ClassChat classGroup={user?.classGroup || 'S1'} />
        </div>
      )}
    </div>
  );
};
