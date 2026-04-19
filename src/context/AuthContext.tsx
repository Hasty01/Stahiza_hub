import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Ensure this points to your client file
import { supabaseService } from '../lib/supabaseService';
import { MOCK_DATA } from '../lib/mockSupabase';

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
  login: (email: string, password?: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<void>;
  signup: (name: string, email: string, role: UserRole, classGroup: ClassGroup, password?: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  isMock: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMock, setIsMock] = useState(false);

  useEffect(() => {
    let subscription: { unsubscribe: () => void } | null = null;

    const initAuth = async () => {
      try {
        // Set mock mode based on env or logic
        const mockMode = !import.meta.env.VITE_SUPABASE_URL;
        setIsMock(mockMode);

        if (mockMode) {
          setLoading(false);
          return;
        }

        // 1. Check active session
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          await fetchProfile(session.user.id);
        } else {
          setLoading(false);
        }

        // 2. Listen for auth changes
        const { data: { subscription: sub } } = supabase.auth.onAuthStateChange((_event, session) => {
          if (session) {
            fetchProfile(session.user.id);
          } else {
            setUser(null);
            setLoading(false);
          }
        });
        subscription = sub;
      } catch (err) {
        console.error('Auth initialization error:', err);
        setError(err instanceof Error ? err.message : 'Failed to initialize Auth');
        setLoading(false);
      }
    };

    initAuth();

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      // WE USE 'users' TABLE INSTEAD OF 'profiles'
      const { data, error } = await supabase
        .from('users') 
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        setUser({
          id: data.id,
          name: data.name,
          email: data.email || '',
          role: data.role as UserRole,
          classGroup: data.class_group as ClassGroup,
          isApproved: data.is_approved,
          avatar: data.avatar
        });
      } else {
        // Fallback for OAuth or missing profile
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) {
          const newUser: User = {
            id: authUser.id,
            name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'Unknown User',
            email: authUser.email || '',
            role: 'student', 
            classGroup: 'S1', 
            isApproved: false,
            avatar: authUser.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${authUser.id}`
          };
          
          await supabaseService.syncProfile(newUser);
          setUser(newUser);
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password?: string) => {
    if (isMock) {
      const mockUser = MOCK_DATA.profiles[0]; // Fallback to first mock profile
      setUser({
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
        role: mockUser.role as UserRole,
        classGroup: mockUser.class_group as ClassGroup,
        isApproved: mockUser.is_approved,
        avatar: mockUser.avatar
      });
      return true;
    }

    if (!password) return false;
    
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Login error:', err);
      return false;
    }
  };

  const signup = async (name: string, email: string, role: UserRole, classGroup: ClassGroup, password?: string) => {
    if (isMock) {
      setUser({
        id: Math.random().toString(36).substr(2, 9),
        name, email, role, classGroup,
        isApproved: role === 'admin',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      });
      return;
    }

    if (!password) throw new Error("Password required");

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name, role: role }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        const newUser: User = {
          id: authData.user.id,
          name,
          email,
          role,
          classGroup,
          isApproved: role === 'admin',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
        };
        
        // Sync to our 'users' table
        await supabaseService.syncProfile(newUser);
        setUser(newUser);
      }
    } catch (err) {
      console.error('Signup error:', err);
      throw err;
    }
  };

  const logout = async () => {
    if (!isMock) await supabase.auth.signOut();
    setUser(null);
  };

  const updateUser = async (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      if (!isMock) await supabaseService.syncProfile(updatedUser);
      setUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, loginWithGoogle: async () => {}, signup, logout, updateUser, isAuthenticated: !!user, loading, error, isMock }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}