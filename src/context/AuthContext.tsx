// src/context/AuthContext.tsx

import { createContext, useState, useEffect, ReactNode } from 'react';
import { AuthUser, AuthContextType, LoginCredentials, SignupData } from '@/types';
import { supabase } from '@/lib/supabaseClient';
import { Session, User } from '@supabase/supabase-js';
import { toast } from 'sonner';

// VERSION 8 LOG - STABLE LOADING - FINAL FIX
console.log("AuthContext LOADED - VERSION 8 - STABLE LOADING");

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // isLoading ko sirf shuru mein true rakhenge
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getProfile = async (user: User): Promise<AuthUser | null> => {
    try {
      const { data, error, status } = await supabase
        .from('profiles')
        .select('username, ign, free_fire_id, role, referral_code')
        .eq('id', user.id)
        .single();

      if (error && status !== 406) {
        console.error("Error fetching profile from DB:", error);
        return null;
      }
      if (!data) {
        console.warn("Profile not found in DB for user:", user.id);
        return null;
      }
      return {
        id: user.id, email: user.email || '', username: data.username || 'Gamer',
        ign: data.ign || 'N/A', freeFireId: data.free_fire_id || 'N/A',
        role: data.role || 'user', referralCode: data.referral_code || '',
        createdAt: user.created_at,
      };
    } catch (e) {
      console.error('Unexpected error in getProfile:', e);
      return null;
    }
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth State Changed:", event, session);
      const profile = session?.user ? await getProfile(session.user) : null;
      setUser(profile);
      setIsLoading(false); // Yeh sirf ek baar chalega jab state change hogi
    });

    // Pehli baar session check karne ke liye
    const checkInitialSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
            const profile = await getProfile(session.user);
            setUser(profile);
        }
        setIsLoading(false); // Important: Initial check ke baad loading band karo
    };
    checkInitialSession();

    return () => { authListener?.subscription.unsubscribe(); };
  }, []);

  // --- YEH FUNCTIONS CHANGE HUE HAIN ---
  // In functions se isLoading ko poori tarah se hata diya gaya hai

  const login = async (credentials: LoginCredentials) => {
    const { error } = await supabase.auth.signInWithPassword(credentials);
    if (error) throw error;
    // Loading state ko onAuthStateChange handle karega
  };

  const signup = async (data: SignupData) => {
    // ... signup logic same rahega
    const { email, password, username, ign, freeFireId } = data;
    const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });
    if (authError) throw authError;
    if (!authData.user) throw new Error("Signup failed, user not created.");
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({ id: authData.user.id, username, ign, free_fire_id: freeFireId, email });
    if (profileError) {
      console.error("CRITICAL: Profile creation failed after signup:", profileError);
      // Note: User delete karne ke liye admin rights chahiye, client-side se safe nahi hai.
      // Abhi ke liye hum sirf error log karenge.
      throw new Error("Could not create user profile. Please contact support.");
    }
    return { success: true, message: 'Signup successful! Please log in.' };
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Logout failed. Please try again.');
    } else {
      toast.success('Logged out successfully!');
    }
    // Loading state ko onAuthStateChange handle karega
  };
  
  const adminLogin = async (credentials: LoginCredentials) => {
    const { data, error } = await supabase.auth.signInWithPassword(credentials);
    if (error) throw error;
    if (!data.user) throw new Error("Authentication failed.");

    const profile = await getProfile(data.user);
    if (profile?.role !== 'admin') {
      await supabase.auth.signOut(); // Turant logout kar do
      throw new Error('You do not have admin privileges.');
    }
    // Success hone par onAuthStateChange state ko update karega
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, adminLogin, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};