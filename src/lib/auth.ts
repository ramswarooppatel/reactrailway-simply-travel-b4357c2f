
import { supabase } from './supabase';

export type AuthSession = {
  user: {
    id: string;
    email: string;
    user_metadata: {
      name?: string;
    };
  } | null;
  session: any;
};

export const signUp = async (email: string, password: string, name: string): Promise<{ error: any; data: any }> => {
  try {
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });
    return { error, data };
  } catch (error) {
    return { error, data: null };
  }
};

export const signIn = async (email: string, password: string): Promise<{ error: any; data: any }> => {
  try {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error, data };
  } catch (error) {
    return { error, data: null };
  }
};

export const signOut = async (): Promise<{ error: any }> => {
  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (error) {
    return { error };
  }
};

export const getSession = async (): Promise<AuthSession | null> => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error || !data.session) return null;
    return {
      user: data.session.user,
      session: data.session,
    };
  } catch (error) {
    return null;
  }
};

export const resetPassword = async (email: string): Promise<{ error: any }> => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    return { error };
  } catch (error) {
    return { error };
  }
};

export const updatePassword = async (password: string): Promise<{ error: any }> => {
  try {
    const { error } = await supabase.auth.updateUser({
      password,
    });
    return { error };
  } catch (error) {
    return { error };
  }
};
