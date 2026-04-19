import { useEffect } from "react";
import { supabase } from "./supabaseClient";

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthLayout } from './layouts/AuthLayout';
import { DashboardLayout } from './layouts/DashboardLayout';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { RoleSelectionPage } from './pages/auth/RoleSelectionPage';
import { AuthCallback } from './pages/auth/AuthCallback';

// Student Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { StudentChat } from './pages/student/StudentChat';
import { StudentAssignments } from './pages/student/StudentAssignments';
import { StudentSubmitWork } from './pages/student/StudentSubmitWork';
import { StudentAITutor } from './pages/student/StudentAITutor';
import { StudentResources } from './pages/student/StudentResources';
import { StudentRankings } from './pages/student/StudentRankings';

// Teacher Pages
import { TeacherDashboard } from './pages/teacher/TeacherDashboard';
import { TeacherUpload } from './pages/teacher/TeacherUpload';
import { TeacherAssignments } from './pages/teacher/TeacherAssignments';
import { TeacherGrade } from './pages/teacher/TeacherGrade';
import { TeacherChat } from './pages/teacher/TeacherChat';
import { TeacherChallenges } from './pages/teacher/TeacherChallenges';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminChat } from './pages/admin/AdminChat';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminNotifications } from './pages/admin/AdminNotifications';
import { AdminAdmissions } from './pages/admin/AdminAdmissions';

// Shared Pages
import { SocialFeed } from './pages/shared/SocialFeed';
import { Feedback } from './pages/shared/Feedback';
import { Profile } from './pages/shared/Profile';
import { LandingPage } from './pages/LandingPage';
import { AdmissionsPage } from './pages/AdmissionsPage';

const RootRedirect = () => {
  const { user } = useAuth();
  if (!user) return <LandingPage />;
  return <Navigate to={`/${user.role}`} replace />;
};

function AppContent() {
  const { loading, error } = useAuth();

  // === TEMPORARY SUPABASE CONNECTION TEST ===
  useEffect(() => {
    const testConnection = async () => {
      console.log("🔄 Testing Supabase connection...");

      const { data, error } = await supabase
        .from('users')
        .select('*');

      console.log("✅ Supabase DATA:", data);
      console.log("❌ Supabase ERROR:", error);
    };

    testConnection();
  }, []);
  // =========================================

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-navy"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-card p-8 rounded-xl shadow-lg border border-border text-center">
          <div className="h-16 w-16 bg-maroon/10 text-maroon rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Configuration Error</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <div className="bg-muted p-4 rounded-lg text-left text-xs font-mono mb-6 overflow-x-auto">
            <p className="font-bold mb-2">Required Secrets:</p>
            <p>VITE_SUPABASE_URL</p>
            <p>VITE_SUPABASE_ANON_KEY</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<RootRedirect />} />
        <Route path="/admissions" element={<AdmissionsPage />} />

        {/* Auth Routes */}
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/role-selection" element={<RoleSelectionPage />} />
        </Route>

        {/* Dashboard Routes */}
        <Route element={<DashboardLayout />}>
          {/* Student Routes */}
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/chat" element={<StudentChat />} />
          <Route path="/student/assignments" element={<StudentAssignments />} />
          <Route path="/student/submit" element={<StudentSubmitWork />} />
          <Route path="/student/ai-tutor" element={<StudentAITutor />} />
          <Route path="/student/resources" element={<StudentResources />} />
          <Route path="/student/rankings" element={<StudentRankings />} />

          {/* Teacher Routes */}
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/teacher/upload" element={<TeacherUpload />} />
          <Route path="/teacher/assignments" element={<TeacherAssignments />} />
          <Route path="/teacher/grade" element={<TeacherGrade />} />
          <Route path="/teacher/chat" element={<TeacherChat />} />
          <Route path="/teacher/challenges" element={<TeacherChallenges />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/chat" element={<AdminChat />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/notifications" element={<AdminNotifications />} />
          <Route path="/admin/admissions" element={<AdminAdmissions />} />

          {/* Shared Routes */}
          <Route path="/social" element={<SocialFeed />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;