import { getSupabase } from './supabase';
import { UserRole, ClassGroup, User } from '../context/AuthContext';

export type UserProfile = User;

// ... (Assignment, Submission, Resource, ChatMessage interfaces remain the same)

class SupabaseService {
  // --- Assignments ---
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

  // ... (addAssignment, submitAssignment, gradeAssignment methods remain the same)

  // --- Resources & Chat ---
  // (Keep your existing getResources, addResource, getChatMessages, sendChatMessage, subscribeToChat logic)

  // --- Users (CRITICAL UPDATES HERE) ---
  async getUsers() {
    const supabase = getSupabase();
    // CHANGED: 'profiles' -> 'users'
    const { data, error } = await supabase.from('users').select('*');
    if (error) throw error;
    
    return data.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      classGroup: u.class_group, // Matches the db column name
      isApproved: u.is_approved,
      avatar: u.avatar,
      created_at: u.created_at
    })) as (User & { created_at: string })[];
  }

  async approveUser(userId: string, isApproved: boolean = true) {
    const supabase = getSupabase();
    // CHANGED: 'profiles' -> 'users'
    const { error } = await supabase.from('users').update({ is_approved: isApproved }).eq('id', userId);
    if (error) throw error;
  }

  async syncProfile(user: User) {
    const supabase = getSupabase();
    // CHANGED: 'profiles' -> 'users'
    // This ensures that when a student at Stahiza signs up, their data is saved correctly
    const { error } = await supabase.from('users').upsert({
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