
import { createClient } from '@supabase/supabase-js';

// Use environment variables if available, otherwise use placeholder values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to check if we're using real credentials
export const isSupabaseConfigured = () => {
  return (
    import.meta.env.VITE_SUPABASE_URL !== undefined && 
    import.meta.env.VITE_SUPABASE_ANON_KEY !== undefined &&
    import.meta.env.VITE_SUPABASE_URL !== 'https://placeholder-url.supabase.co'
  );
};

