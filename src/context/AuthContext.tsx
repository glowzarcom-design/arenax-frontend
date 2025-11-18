// src/context/AuthContext.tsx

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthUser, AuthContextType, LoginCredentials, SignupData } from '@/types';
import { supabase } from '@/lib/supabaseClient';
import { Session, User } from '@supabase/supabase-js';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getProfile = async (user: User): Promise<AuthUser | null> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('username, ign, free_fire_id, role, referral_code')
        .eq('id', user.id)
        .single();
      if (error) { throw error; }
      
      return {
        id: user.id, email: user.email || '', username: data.username, ign: data.ign,
        freeFireId: data.free_fire_id, role: data.role || 'user',
        referralCode: data.referral_code || '', createdAt: user.created_at,
      };
    } catch (e) {
      console.error('Error fetching profile:', e);
      return null;
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const profile = await getProfile(session.user);
        setUser(profile);
      }
      setIsLoading(false);
    };
    checkUser();
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const profile = await getProfile(session.user);
        setUser(profile);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
    return () => { authListener?.subscription.unsubscribe(); };
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const { error } = await supabase.auth.signInWithPassword(credentials);
    if (error) throw error;
  };

  const adminLogin = async (credentials: LoginCredentials) => {
    const ADMIN_EMAIL = 'ashadislam333@gmail.com';
    const ADMIN_PASS = 'mohammadashad00';
    if (credentials.email === ADMIN_EMAIL && credentials.password === ADMIN_PASS) {
      const mockAdminUser: AuthUser = {
        id: 'admin-001', username: 'Ashad Islam', email: 'ashadislam333@gmail.com',
        ign: 'AdminIGN', freeFireId: 'ADMIN123', role: 'admin',
        referralCode: 'ADMINREF', createdAt: new Date().toISOString(),
      };
      setUser(mockAdminUser);
    } else {
      throw new Error('Invalid Admin Credentials');
    }
  };
  
  // Helper function to create the profile details in the 'profiles' table.
  const createProfile = async ({ user, username, ign, freeFireId }: { user: User, username: string, ign: string, freeFireId: string }) => {
    const { error: insertError } = await supabase
      .from('profiles')
      .insert({
        id: user.id, // Supabase Auth ID
        username: username,
        ign: ign,
        free_fire_id: freeFireId,
        role: 'user', // Default role set here
        referral_code: null, // <--- FINAL FIX: Added referral_code to ensure INSERT success
      })
      .select()
      .single();

    if (insertError) {
      console.error("Critical Error: Failed to save profile details.", insertError);
      throw new Error("Account created, but failed to save profile details. Please contact support.");
    }
  };

  // Helper function for when the user is logged in immediately.
  const createProfileAndSetUser = async ({ user, username, ign, freeFireId }: { user: User, username: string, ign: string, freeFireId: string }) => {
    await createProfile({ user, username, ign, freeFireId });
    const profile = await getProfile(user);
    setUser(profile);
  };

  // ----- YEH HAI FINAL SIGNUP FUNCTION (FIXED) -----
  const signup = async (data: SignupData) => {
    const { email, password, username, ign, freeFireId } = data;

    // Step 1: Create the user in Supabase Auth.
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      throw authError;
    }

    // Supabase Auth requires email verification. User will get logged in ONLY after they click the email link.
    if (authData.user && authData.session) {
      // Agar Supabase ne user ko turant login kar diya (jo ki email verification off hone par hota hai)
      await createProfileAndSetUser({ user: authData.user, username, ign, freeFireId });
      return { success: true, message: 'Login successful!' };
    } else if (authData.user && !authData.session) {
      // Agar user create hua, but session nahi bana (kyunki email verification pending hai)
      await createProfile({ user: authData.user, username, ign, freeFireId });
      return { success: true, message: 'Please check your email to confirm your account and log in.' };
    } else {
      // Fallback error
      throw new Error("Signup process failed to complete.");
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, adminLogin, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
