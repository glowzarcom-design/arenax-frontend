// src/lib/supabaseClient.ts (FIXED FOR VERCEL DEPLOYMENT)

import { createClient } from '@supabase/supabase-js';

// Vercel/Next.js ke liye NEXT_PUBLIC_ prefix use karte hain
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Production deploy par environment variables milne chahiye
  console.error("Supabase URL or Anon Key is missing. Check Vercel environment variables.");
}

// createClient ko undefined keys se bachane ke liye (optional but safer)
const url = typeof window !== 'undefined' ? supabaseUrl : (supabaseUrl || 'https://dummy.co');
const key = typeof window !== 'undefined' ? supabaseAnonKey : (supabaseAnonKey || 'dummy_key');

// Check karein ki keys available hain tabhi client banao
if (url && key && url !== 'https://dummy.co') {
    export const supabase = createClient(url, key);
} else {
    // Agar production mein keys available nahi hain toh ek dummy client banao ya throw karo
    throw new Error("Supabase client could not be initialized. Environment keys missing.");
}

// OLD CODE:
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
