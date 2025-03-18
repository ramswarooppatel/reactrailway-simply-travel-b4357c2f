
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Database } from '../integrations/supabase/types';

// Create a single supabase client for interacting with your database
const supabaseUrl = 'https://besatfchjxcxwpnwfbwo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlc2F0ZmNoanhjeHdwbndmYndvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1MjQwNjYsImV4cCI6MjA1NTEwMDA2Nn0.AC0egrIHDLwj21J7i-6Mz936uzZ9ijgjYtipykkN2n0';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
