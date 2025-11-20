// src/lib/supabaseClient.ts

import { createClient } from '@supabase/supabase-js';

// Vite hamesha 'import.meta.env' ka use karta hai
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check karo ki .env file se keys aayi hain ya nahi
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL or Anon Key is missing. Make sure you have a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
}

// Client banao aur export karo
export const supabase = createClient(supabaseUrl, supabaseAnonKey);