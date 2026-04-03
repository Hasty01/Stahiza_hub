import React, { createContext, useContext, useState } from 'react';

export type UserRole = 'student' | 'teacher' | 'admin';
export type ClassGroup = 'S1' | 'S2' | 'S3' | 'S4' | 'S5' | 'S6';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  classGroup?: ClassGroup;
  isApproved?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (role: UserRole, password?: string, classGroup?: ClassGroup) => boolean;
  signup: (name: string, email: string, role: UserRole, classGroup: ClassGroup) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ROLE_PASSWORDS: Record<UserRole, string> = {
  student: 'student123',
  teacher: 'teacher123',
  admin: 'admin123',
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (role: UserRole, password?: string, classGroup?: ClassGroup) => {
    // Password is required for all roles
    if (!password || password !== ROLE_PASSWORDS[role]) {
      return false;
    }

    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: `Mock ${role.charAt(0).toUpperCase() + role.slice(1)}`,
      email: `${role}@stahiza.com`,
      role,
      classGroup: classGroup || (role === 'student' ? 'S1' : 'S1'),
      isApproved: role === 'admin' ? true : false, // Admins are approved, others need approval
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${role}`,
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    return true;
  };

  const signup = (name: string, email: string, role: UserRole, classGroup: ClassGroup) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role,
      classGroup,
      isApproved: role === 'admin' ? true : false,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
