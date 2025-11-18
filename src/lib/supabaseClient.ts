// src/lib/supabaseClient.ts (FINAL ATTEMPT: VITE AND NEXT_PUBLIC CHECK)

import { createClient } from '@supabase/supabase-js';

// Pehle VITE variables check karte hain (jo tumhare original code mein tha)
const viteUrl = import.meta.env.VITE_SUPABASE_URL;
const viteKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Phir NEXT_PUBLIC variables check karte hain (jo Vercel par common hai)
const nextUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const nextKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Jo bhi key available ho, use select karo (Vite ko priority denge)
const supabaseUrl = viteUrl || nextUrl;
const supabaseAnonKey = viteKey || nextKey;

let client = null;

if (supabaseUrl && supabaseAnonKey) {
  // Agar keys available hain, toh client banao
  client = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.error("Critical: Supabase Environment Keys missing.");
  if (typeof window === 'undefined') {
    throw new Error("Critical: Missing Supabase Environment Keys during build/server process.");
  }
}

// Client ko export karo
export const supabase = client as ReturnType<typeof createClient>;
