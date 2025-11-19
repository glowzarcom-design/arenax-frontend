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

      if (error && error.code !== 'PGRST116') {
        console.error("Error fetching profile after login/signup:", error);
        throw error;
      }

      return {
        id: user.id,
        email: user.email || '',
        username: data?.username || 'N/A',
        ign: data?.ign || 'N/A',
        freeFireId: data?.free_fire_id || 'N/A',
        role: data?.role || 'user',
        referralCode: data?.referral_code || '',
        createdAt: user.created_at,
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

  // ----- YEH HAI NAYA SIGNUP FUNCTION (TRIGGER KE SAATH KAAM KAREGA) -----
  const signup = async (data: SignupData) => {
    const { email, password, username, ign, freeFireId } = data;

    console.log('1. Starting Supabase Auth sign up for:', email);

    // Step 1: Create the user in Supabase Auth.
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      console.error('2. Auth Error:', authError);
      throw authError;
    }

    if (!authData.user) {
      throw new Error("User object is null after signup attempt.");
    }

    console.log('2. Auth Success. User ID:', authData.user.id);
    
    // Step 2: UPDATE the profile that was automatically created by the trigger.
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ 
          username: username, 
          ign: ign, 
          free_fire_id: freeFireId 
      })
      .eq('id', authData.user.id);

    if (updateError) {
      console.error("CRITICAL UPDATE ERROR: Profile update failed.", updateError);
      // User account ban gaya hai, lekin details update nahi hui.
      throw new Error(`Account created, but failed to save profile details. Error: ${updateError.message}`);
    }

    console.log('3. Profile details updated successfully.');

    // Step 4: Handle Session/Redirection
    if (authData.session) {
      // Agar Supabase ne turant login kar diya (email verification band hai)
      console.log('4. Session found. Fetching full profile...');
      const profile = await getProfile(authData.user);
      setUser(profile);
      console.log('5. Profile fetched. Signup complete.');
      return { success: true, message: 'Signup successful! Welcome!' };
    } else {
      // Agar user ban gaya, lekin session nahi bana (email verification on hai)
      console.log('4. No Session. Email verification required.');
      return { success: true, message: 'Please check your email to confirm your account!' };
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
