// src/lib/supabaseClient.ts (FINAL FIXED CODE)

import { createClient } from '@supabase/supabase-js';

// Vercel/Next.js ke liye NEXT_PUBLIC_ prefix use karte hain
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Ek Global Variable banao jo export hoga
let client = null;

if (supabaseUrl && supabaseAnonKey) {
  // Agar keys available hain, toh client banao
  client = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // Agar keys available nahi hain (e.g. Vercel mein set nahi hai)
  console.error("Supabase URL or Anon Key is missing. Check your Vercel environment variables.");
  
  // Optional: Error throw karo taki development mein pata chal jaye
  if (typeof window === 'undefined') {
    throw new Error("Critical: Missing Supabase Environment Keys during build/server process.");
  }
}

// Ensure client is exported, even if it's null (for safety)
// Hum maan rahe hain ki agar deployment successful ho raha hai, toh client bana hoga.
export const supabase = client as ReturnType<typeof createClient>;
