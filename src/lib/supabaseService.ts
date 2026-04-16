import { getSupabase } from './supabase';
import { UserRole, ClassGroup, User } from '../context/AuthContext';

export type UserProfile = User;

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  classGroup: ClassGroup;
  teacherId: string;
  teacherName: string;
  type: 'homework' | 'project' | 'quiz';
  fileUrl?: string;
  studentSubmissions?: Submission[];
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  submittedAt: string;
  fileUrl?: string;
  grade?: string;
  feedback?: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'link' | 'document';
  classGroup: ClassGroup;
  teacherId: string;
  teacherName: string;
  fileUrl: string;
  createdAt: string;
  subject?: string;
}

export interface ChatMessage {
  id: string;
  channel_id: string;
  sender_id: string;
  sender_name: string;
  sender_role: string;
  text: string;
  class_group: string;
  is_teacher: boolean;
  created_at: string;
}

class SupabaseService {
  // Assignments
  async getAssignments(classGroup?: ClassGroup, teacherId?: string) {
    const supabase = getSupabase();
    let query = supabase.from('assignments').select('*, submissions(*)');
    
    if (teacherId) {
      query = query.eq('teacher_id', teacherId);
    } else if (classGroup) {
      query = query.eq('class_group', classGroup);
    }

    const { data, error } = await query;
    if (error) throw error;
    
    return data.map(a => ({
      id: a.id,
      title: a.title,
      description: a.description,
      dueDate: a.due_date,
      classGroup: a.class_group,
      teacherId: a.teacher_id,
      teacherName: a.teacher_name,
      type: a.type,
      fileUrl: a.file_url,
      studentSubmissions: a.submissions?.map((s: any) => ({
        id: s.id,
        assignmentId: s.assignment_id,
        studentId: s.student_id,
        studentName: s.student_name,
        submittedAt: s.submitted_at,
        fileUrl: s.file_url,
        grade: s.grade,
        feedback: s.feedback
      }))
    })) as Assignment[];
  }

  async addAssignment(assignment: Omit<Assignment, 'id'>) {
    const supabase = getSupabase();
    const { data, error } = await supabase.from('assignments').insert({
      title: assignment.title,
      description: assignment.description,
      due_date: assignment.dueDate,
      class_group: assignment.classGroup,
      teacher_id: assignment.teacherId,
      teacher_name: assignment.teacherName,
      type: assignment.type,
      file_url: assignment.fileUrl
    }).select().single();

    if (error) throw error;
    return data as Assignment;
  }

  async submitAssignment(submission: {
    assignment_id: string;
    student_id: string;
    student_name: string;
    file_url?: string;
    file_name?: string;
    status?: string;
  }) {
    const supabase = getSupabase();
    const { error } = await supabase.from('submissions').insert({
      assignment_id: submission.assignment_id,
      student_id: submission.student_id,
      student_name: submission.student_name,
      submitted_at: new Date().toISOString(),
      file_url: submission.file_url,
      file_name: submission.file_name,
      status: submission.status || 'submitted'
    });

    if (error) throw error;
  }

  async gradeAssignment(submissionId: string, grade: string, feedback: string) {
    const supabase = getSupabase();
    const { error } = await supabase.from('submissions').update({
      grade,
      feedback
    }).eq('id', submissionId);

    if (error) throw error;
  }

  // Resources
  async getResources(classGroup?: ClassGroup) {
    const supabase = getSupabase();
    let query = supabase.from('resources').select('*');
    if (classGroup) {
      query = query.eq('class_group', classGroup);
    }

    const { data, error } = await query;
    if (error) throw error;
    
    return data.map(r => ({
      id: r.id,
      title: r.title,
      description: r.description,
      type: r.type,
      classGroup: r.class_group,
      teacherId: r.teacher_id,
      teacherName: r.teacher_name,
      fileUrl: r.file_url,
      createdAt: r.created_at,
      subject: r.subject
    })) as Resource[];
  }

  async addResource(resource: Omit<Resource, 'id' | 'createdAt'>) {
    const supabase = getSupabase();
    const { data, error } = await supabase.from('resources').insert({
      title: resource.title,
      description: resource.description,
      type: resource.type,
      class_group: resource.classGroup,
      teacher_id: resource.teacherId,
      teacher_name: resource.teacherName,
      file_url: resource.fileUrl,
      subject: resource.subject
    }).select().single();

    if (error) throw error;
    return data as Resource;
  }

  // Chat
  async getChatMessages(classGroup: string) {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('class_group', classGroup)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data as ChatMessage[];
  }

  async sendChatMessage(message: Omit<ChatMessage, 'id' | 'created_at'>) {
    const supabase = getSupabase();
    const { data, error } = await supabase.from('chat_messages').insert({
      class_group: message.class_group,
      sender_id: message.sender_id,
      sender_name: message.sender_name,
      sender_role: message.sender_role,
      text: message.text,
      is_teacher: message.is_teacher
    }).select().single();

    if (error) throw error;
    return data as ChatMessage;
  }

  subscribeToChat(classGroup: string, callback: (payload: any) => void) {
    const supabase = getSupabase();
    return supabase
      .channel(`chat:${classGroup}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'chat_messages',
        filter: `class_group=eq.${classGroup}`
      }, callback)
      .subscribe();
  }

  // Users (Profiles)
  async getUsers() {
    const supabase = getSupabase();
    const { data, error } = await supabase.from('profiles').select('*');
    if (error) throw error;
    
    return data.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      classGroup: u.class_group,
      isApproved: u.is_approved,
      avatar: u.avatar,
      created_at: u.created_at
    })) as (User & { created_at: string })[];
  }

  async approveUser(userId: string, isApproved: boolean = true) {
    const supabase = getSupabase();
    const { error } = await supabase.from('profiles').update({ is_approved: isApproved }).eq('id', userId);
    if (error) throw error;
  }

  async syncProfile(user: User) {
    const supabase = getSupabase();
    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      class_group: user.classGroup,
      is_approved: user.isApproved,
      avatar: user.avatar
    });
    if (error) throw error;
  }
}

export const supabaseService = new SupabaseService();
