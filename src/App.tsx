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

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<RootRedirect />} />
            <Route path="/admissions" element={<AdmissionsPage />} />

            {/* Auth Routes */}
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
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
