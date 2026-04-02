import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { mockSupabase } from './mockSupabase';

let supabaseClient: SupabaseClient | null = null;
let isMock = false;

export const getSupabase = () => {
  if (supabaseClient) return supabaseClient;

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseUrl.startsWith('http') || !supabaseAnonKey) {
    console.warn('Supabase URL or Anon Key is missing. Falling back to mock client for demo mode.');
    isMock = true;
    supabaseClient = mockSupabase as any;
    return supabaseClient!;
  }

  try {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
    return supabaseClient;
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error);
    isMock = true;
    supabaseClient = mockSupabase as any;
    return supabaseClient!;
  }
};

export const isSupabaseMock = () => isMock;
