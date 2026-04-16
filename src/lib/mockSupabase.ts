import { UserRole, ClassGroup } from '../context/AuthContext';

// Mock data for the application when Supabase is not configured
export const MOCK_DATA = {
  profiles: [
    { id: '1', name: 'Admin User', email: 'admin@stahiza.com', role: 'admin', is_approved: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin' },
    { id: '2', name: 'Teacher John', email: 'teacher@stahiza.com', role: 'teacher', is_approved: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
    { id: '3', name: 'Student Alice', email: 'student@stahiza.com', role: 'student', is_approved: true, class_group: 'S4', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice' },
  ],
  assignments: [
    { id: 'a1', title: 'Calculus Homework', description: 'Complete exercises 1-10', due_date: '2026-04-15', class_group: 'S4', teacher_id: '2', teacher_name: 'Teacher John', type: 'homework' },
    { id: 'a2', title: 'Physics Project', description: 'Build a simple circuit', due_date: '2026-04-20', class_group: 'S4', teacher_id: '2', teacher_name: 'Teacher John', type: 'project' },
  ],
  resources: [
    { id: 'r1', title: 'Math Syllabus', description: 'Full year syllabus', type: 'pdf', class_group: 'S4', teacher_id: '2', teacher_name: 'Teacher John', file_url: '#', created_at: new Date().toISOString(), subject: 'Mathematics' },
  ],
  chat_messages: [
    { id: 'm1', class_group: 'S4', sender_id: '2', sender_name: 'Teacher John', sender_role: 'teacher', text: 'Welcome to the class chat!', is_teacher: true, created_at: new Date().toISOString() },
  ]
};

// A very basic mock of the Supabase client structure
export const mockSupabase = {
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: async () => ({ data: { user: null }, error: { message: 'Mock mode: Please use "Demo Login"' } }),
    signUp: async () => ({ data: { user: null }, error: { message: 'Mock mode: Signup disabled' } }),
    signOut: async () => ({ error: null }),
  },
  from: (table: string) => ({
    select: () => ({
      eq: () => ({
        single: async () => ({ data: MOCK_DATA.profiles[0], error: null }),
        order: async () => ({ data: (MOCK_DATA as any)[table] || [], error: null }),
      }),
      order: async () => ({ data: (MOCK_DATA as any)[table] || [], error: null }),
      async then(resolve: any) { resolve({ data: (MOCK_DATA as any)[table] || [], error: null }); }
    }),
    insert: () => ({
      select: () => ({
        single: async () => ({ data: {}, error: null })
      }),
      async then(resolve: any) { resolve({ data: [], error: null }); }
    }),
    update: () => ({
      eq: async () => ({ error: null })
    }),
    upsert: async () => ({ error: null }),
  }),
  channel: () => ({
    on: () => ({
      subscribe: () => ({ unsubscribe: () => {} })
    })
  })
};
