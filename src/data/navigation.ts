import { 
  LayoutDashboard, 
  MessageSquare, 
  BookOpen, 
  FileText, 
  Users, 
  Bell, 
  Settings, 
  LogOut, 
  GraduationCap, 
  TrendingUp, 
  Share2, 
  HelpCircle,
  Video,
  Trophy,
  Upload,
  CheckSquare,
  PlusCircle,
  ShieldCheck,
  UserPlus
} from 'lucide-react';

export const STUDENT_NAV = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/student' },
  { name: 'Class Chat', icon: MessageSquare, path: '/student/chat' },
  { name: 'Assignments', icon: BookOpen, path: '/student/assignments' },
  { name: 'Submit Work', icon: Upload, path: '/student/submit' },
  { name: 'AI Tutor', icon: GraduationCap, path: '/student/ai-tutor' },
  { name: 'Notes & Videos', icon: Video, path: '/student/resources' },
  { name: 'Rankings', icon: Trophy, path: '/student/rankings' },
];

export const TEACHER_NAV = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/teacher' },
  { name: 'Upload Resources', icon: Upload, path: '/teacher/upload' },
  { name: 'Create Assignments', icon: PlusCircle, path: '/teacher/assignments' },
  { name: 'Grade Submissions', icon: CheckSquare, path: '/teacher/grade' },
  { name: 'Teacher Chat', icon: MessageSquare, path: '/teacher/chat' },
  { name: 'Manage Challenges', icon: Trophy, path: '/teacher/challenges' },
];

export const ADMIN_NAV = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { name: 'Admin Chat', icon: ShieldCheck, path: '/admin/chat' },
  { name: 'Manage Users', icon: Users, path: '/admin/users' },
  { name: 'Notifications', icon: Bell, path: '/admin/notifications' },
  { name: 'Admissions', icon: UserPlus, path: '/admin/admissions' },
];

export const SHARED_NAV = [
  { name: 'Social Feed', icon: Share2, path: '/social' },
  { name: 'Feedback', icon: HelpCircle, path: '/feedback' },
  { name: 'Profile', icon: Settings, path: '/profile' },
];
