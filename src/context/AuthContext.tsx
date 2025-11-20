// src/context/AuthContext.tsx

import { createContext, useState, useEffect, ReactNode } from 'react';
import { AuthUser, AuthContextType, LoginCredentials, SignupData } from '@/types';
import { supabase } from '@/lib/supabaseClient';
import { Session, User } from '@supabase/supabase-js';

// VERSION 5 LOG - REAL ADMIN LOGIN LOGIC
console.log("AuthContext LOADED - VERSION 5 - REAL ADMIN LOGIC");

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Helper to fetch profile
  const getProfile = async (user: User): Promise<AuthUser | null> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('username, ign, free_fire_id, role, referral_code')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error("Error fetching profile from DB:", error);
        return null;
      }

      return {
        id: user.id,
        email: user.email || '',
        username: data?.username || 'Gamer',
        ign: data?.ign || 'N/A',
        freeFireId: data?.free_fire_id || 'N/A',
        role: data?.role || 'user',
        referralCode: data?.referral_code || '',
        createdAt: user.created_at,
      };
    } catch (e) {
      console.error('Unexpected error in getProfile:', e);
      return null;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const profile = await getProfile(session.user);
        setUser(profile);
      }
      setIsLoading(false);
    };

    initAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth State Changed:", event);
      const user = session?.user ? await getProfile(session.user) : null;
      setUser(user);
      setIsLoading(false);
    });

    return () => { authListener?.subscription.unsubscribe(); };
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const { data, error } = await supabase.auth.signInWithPassword(credentials);
    if (error) throw error;
  };

  const signup = async (data: SignupData) => {
    const { email, password, username, ign, freeFireId } = data;
    const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });

    if (authError) throw authError;
    if (!authData.user) throw new Error("Signup failed, user not created.");

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ username, ign, free_fire_id: freeFireId })
      .eq('id', authData.user.id);

    if (updateError) {
      console.error("Profile update error during signup:", updateError);
    }
    
    return { success: true, message: authData.session ? 'Signup successful!' : 'Please check your email!' };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };
  
  // ----- YEH FUNCTION AB BADAL GAYA HAI -----
  const adminLogin = async (credentials: LoginCredentials) => {
    // 1. Pehle normal user ki tarah login karne ki koshish karo
    const { data, error } = await supabase.auth.signInWithPassword(credentials);

    if (error) {
      console.error("Admin Login Failed (Auth Error):", error);
      throw error;
    }
    
    if (!data.user) {
        throw new Error("Authentication failed.");
    }

    // 2. Login successful hone ke baad, profile se role check karo
    const profile = await getProfile(data.user);

    if (profile?.role === 'admin') {
      // 3. Agar role 'admin' hai, tabhi aage badho
      setUser(profile);
    } else {
      // 4. Agar admin nahi hai, toh turant logout kar do aur error do
      await supabase.auth.signOut();
      throw new Error('You do not have admin privileges.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, adminLogin, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};