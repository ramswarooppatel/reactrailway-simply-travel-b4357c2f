import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthSession, getSession, signIn, signOut, signUp } from '../lib/auth';
import { supabase } from '../lib/supabase';

type AuthContextType = {
  session: AuthSession | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any; data: any }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: any; data: any }>;
  signOut: () => Promise<{ error: any }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for an existing session on component mount
    getSession().then((session) => {
      setSession(session);
      setIsLoading(false);
    });

    // Set up a subscription for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(`Supabase auth event: ${event}`);
        if (session) {
          const authSession: AuthSession = {
            user: session.user,
            session,
          };
          setSession(authSession);
        } else {
          setSession(null);
        }
        setIsLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const value = {
    session,
    isLoading,
    signIn,
    signUp,
    signOut: async () => {
      const result = await signOut();
      return result;
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
