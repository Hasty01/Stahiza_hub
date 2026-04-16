import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSupabase, isSupabaseMock } from '../lib/supabase';
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
        const supabase = getSupabase();
        setIsMock(isSupabaseMock());
        
        // Check active sessions and sets the user
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          await fetchProfile(session.user.id);
        } else {
          setLoading(false);
        }

        // Listen for changes on auth state (logged in, signed out, etc.)
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
        console.error('Supabase initialization error:', err);
        setError(err instanceof Error ? err.message : 'Failed to initialize Supabase');
        setLoading(false);
      }
    };

    initAuth();

    const handleMessage = (event: MessageEvent) => {
      const origin = event.origin;
      if (!origin.endsWith('.run.app') && !origin.includes('localhost')) {
        return;
      }
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        const session = event.data.session;
        if (session && session.user) {
          fetchProfile(session.user.id);
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      if (subscription) subscription.unsubscribe();
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        setUser({
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role,
          classGroup: data.class_group,
          isApproved: data.is_approved,
          avatar: data.avatar
        });
      } else {
        // Check if there's an auth user to create a profile for (OAuth flow)
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) {
          const newUser: User = {
            id: authUser.id,
            name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'Unknown User',
            email: authUser.email || '',
            role: 'student', // Default role
            classGroup: 'S1', // Default class
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
    // Demo login for mock mode
    if (isMock) {
      const mockUser = MOCK_DATA.profiles.find(p => p.email === email) || MOCK_DATA.profiles[0];
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
      const supabase = getSupabase();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error.message);
        return false;
      }
      return true;
    } catch (err) {
      console.error('Login error:', err);
      return false;
    }
  };

  const loginWithGoogle = async () => {
    if (isMock) {
      // Mock Google Login
      const mockUser = MOCK_DATA.profiles[0];
      setUser({
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
        role: mockUser.role as UserRole,
        classGroup: mockUser.class_group as ClassGroup,
        isApproved: mockUser.is_approved,
        avatar: mockUser.avatar
      });
      return;
    }

    try {
      const supabase = getSupabase();
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          skipBrowserRedirect: true,
        },
      });

      if (error) throw error;
      if (data?.url) {
        window.open(data.url, 'google_login', 'width=600,height=700');
      }
    } catch (err) {
      console.error('Google login error:', err);
      throw err;
    }
  };

  const signup = async (name: string, email: string, role: UserRole, classGroup: ClassGroup, password?: string) => {
    if (isMock) {
      setUser({
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        role,
        classGroup,
        isApproved: role === 'admin',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      });
      return;
    }

    if (!password) return;

    try {
      const supabase = getSupabase();
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
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
        
        await supabaseService.syncProfile(newUser);
        setUser(newUser);
      }
    } catch (err) {
      console.error('Signup error:', err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      const supabase = getSupabase();
      await supabase.auth.signOut();
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const updateUser = async (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      if (!isMock) {
        await supabaseService.syncProfile(updatedUser);
      }
      setUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, loginWithGoogle, signup, logout, updateUser, isAuthenticated: !!user, loading, error, isMock }}>
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
