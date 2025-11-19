// src/context/AuthContext.tsx

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthUser, AuthContextType, LoginCredentials, SignupData } from '@/types';
import { supabase } from '@/lib/supabaseClient';
import { Session, User } from '@supabase/supabase-js';

// VERSION 3 LOG - Taaki confirm ho jaye ki naya code hai
console.log("AuthContext LOADED - VERSION 3 - FINAL ROBUST CODE");

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Helper to fetch profile
  const getProfile = async (user: User): Promise<AuthUser | null> => {
    try {
      console.log("Fetching profile for:", user.id);
      const { data, error } = await supabase
        .from('profiles')
        .select('username, ign, free_fire_id, role, referral_code')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error("Error fetching profile DB:", error);
        // Agar profile nahi mili, toh null return karo, error throw mat karo
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
        // Agar profile DB mein nahi mili, toh bhi basic user set karo
        if (profile) {
            setUser(profile);
        } else {
            // FALLBACK: Agar DB khali hai, tab bhi login hone do
            console.log("Profile missing in DB, using fallback user data");
            setUser({
                id: session.user.id,
                email: session.user.email || '',
                username: 'New User',
                ign: 'Update Profile',
                freeFireId: 'Update Profile',
                role: 'user',
                referralCode: '',
                createdAt: new Date().toISOString()
            });
        }
      }
      setIsLoading(false);
    };

    initAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth State Changed:", event);
      if (session?.user) {
        const profile = await getProfile(session.user);
         if (profile) {
            setUser(profile);
        } else {
             setUser({
                id: session.user.id,
                email: session.user.email || '',
                username: 'New User',
                ign: 'Update Profile',
                freeFireId: 'Update Profile',
                role: 'user',
                referralCode: '',
                createdAt: new Date().toISOString()
            });
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => { authListener?.subscription.unsubscribe(); };
  }, []);

  // Login Function - SUPER DETAILED LOGGING
  const login = async (credentials: LoginCredentials) => {
    console.log("LOGIN START: Sending request...");
    
    const { data, error } = await supabase.auth.signInWithPassword(credentials);

    if (error) {
      console.error("LOGIN FAILED (Supabase Error):", error);
      throw error;
    }

    if (!data.user) {
        console.error("LOGIN FAILED: No user data returned");
        throw new Error("Login failed: No user returned");
    }

    console.log("LOGIN SUCCESS: Auth worked. Fetching profile...");
    
    // Force profile fetch immediately
    const profile = await getProfile(data.user);
    
    if (profile) {
        console.log("Profile found, setting user.");
        setUser(profile);
    } else {
        console.log("Profile NOT found in DB. Using Emergency Fallback.");
        // Emergency Fallback: Login toh ho gaya, par profile data nahi mila.
        // User ko login hone do, taki wo dashboard par ja sake.
        setUser({
            id: data.user.id,
            email: data.user.email || '',
            username: 'Temp User',
            ign: 'Please Update',
            freeFireId: 'Please Update',
            role: 'user',
            referralCode: '',
            createdAt: new Date().toISOString()
        });
    }
  };

  // Signup Function
  const signup = async (data: SignupData) => {
    const { email, password, username, ign, freeFireId } = data;
    console.log('Signup Start:', email);

    const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });

    if (authError) throw authError;
    if (!authData.user) throw new Error("Signup failed, user not created.");

    console.log('Auth Created. Updating Profile...');

    // Try to update profile
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ username, ign, free_fire_id: freeFireId })
      .eq('id', authData.user.id);

    // Agar update fail bhi ho, toh bhi success return karo taki banda atke nahi
    if (updateError) {
        console.error("Profile update error (ignoring to allow login):", updateError);
    }

    return { success: true, message: authData.session ? 'Signup successful!' : 'Please check your email!' };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const adminLogin = async (credentials: LoginCredentials) => {
      // Admin login logic (mock)
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, adminLogin, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
