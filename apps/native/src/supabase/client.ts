import { createClient } from '@supabase/supabase-js';
import { authStorage } from './authStorage';

export const supabase = createClient(
  process.env['EXPO_PUBLIC_SUPABASE_URL']!,
  process.env['EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY']!,
  {
    auth: {
      storage: authStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);