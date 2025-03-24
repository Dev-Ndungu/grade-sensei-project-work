
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const setData = async () => {
      try {
        // Skip the real authentication if Supabase is not configured
        if (!isSupabaseConfigured()) {
          console.warn('Supabase is not configured with real credentials. Using mock authentication flow.');
          setIsLoading(false);
          return;
        }

        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error(error);
          setIsLoading(false);
          return;
        }
        
        setSession(session);
        setUser(session?.user ?? null);
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Only set up the auth state change listener if Supabase is properly configured
    let subscription: { unsubscribe: () => void } = { unsubscribe: () => {} };
    
    if (isSupabaseConfigured()) {
      const { data } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setSession(session);
          setUser(session?.user ?? null);
        }
      );
      subscription = data.subscription;
    }

    setData();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      if (!isSupabaseConfigured()) {
        console.warn('Using mock authentication. In a real app, this would sign in with Supabase.');
        // Simulate successful sign in for development
        toast.success('Signed in successfully (Development Mode)');
        navigate('/dashboard');
        return;
      }
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success('Signed in successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error signing in:', error);
      toast.error('An error occurred during sign in');
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      setIsLoading(true);
      
      if (!isSupabaseConfigured()) {
        console.warn('Using mock authentication. In a real app, this would register with Supabase.');
        // Simulate successful registration for development
        toast.success('Account created! (Development Mode)');
        navigate('/');
        return;
      }
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      // Update the user profile in the profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: (await supabase.auth.getUser()).data.user?.id,
          full_name: fullName,
          email,
        });

      if (profileError) {
        console.error('Error creating profile:', profileError);
      }

      toast.success('Account created! Please check your email to confirm your account.');
      navigate('/');
    } catch (error) {
      console.error('Error signing up:', error);
      toast.error('An error occurred during sign up');
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      
      if (!isSupabaseConfigured()) {
        console.warn('Using mock authentication. In a real app, this would sign out with Supabase.');
        // Simulate successful sign out for development
        toast.success('Signed out successfully! (Development Mode)');
        navigate('/');
        return;
      }
      
      const { error } = await supabase.auth.signOut();

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success('Signed out successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('An error occurred during sign out');
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
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
