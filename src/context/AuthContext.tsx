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

      // If profile is not found (PGRST116: 0 rows), return an error/null for now.
      // This is the error seen previously: "The result contains 0 rows"
      if (error && error.code !== 'PGRST116') { 
          console.error("Error fetching profile after login/signup:", error);
          throw error; 
      } 
      
      return {
        id: user.id, 
        email: user.email || '', 
        username: data?.username || 'N/A', // Null check added
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
  
  // Inline function to handle profile creation during signup
  const createProfile = async ({ user, username, ign, freeFireId }: { user: User, username: string, ign: string, freeFireId: string }) => {
    console.log("--- STARTING PROFILE INSERT ---");
    
    const profileData = {
      id: user.id,
      username: username,
      ign: ign,
      email: user.email, 
      free_fire_id: freeFireId,
      role: 'user', 
      referral_code: null,
    };

    console.log("Inserting data:", profileData);

    const { error: insertError } = await supabase
      .from('profiles')
      .insert(profileData)
      .select()
      .single();

    if (insertError) {
      console.error("CRITICAL INSERT ERROR: Profile insertion failed.", insertError);
      throw new Error(`Account created, but failed to save profile details. Error details: ${insertError.message}.`);
    }
    console.log("--- PROFILE INSERT SUCCESSFUL ---");
  };

  // ----- YEH HAI FINAL SIGNUP FUNCTION (SUPER-ROBUST) -----
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

    console.log('2. Auth Success. User ID:', authData.user.id, 'Session:', !!authData.session);

    try {
      // Step 2: Create the profile details in the 'profiles' table.
      await createProfile({ user: authData.user, username, ign, freeFireId });
    } catch (profileError) {
      console.error("Error creating profile, but user auth succeeded:", profileError);
      throw profileError;
    }


    // Step 3: Handle Session/Redirection
    if (authData.session) {
      // If Supabase logged the user in immediately (email verification OFF)
      console.log('3. Session found. Fetching Profile...');
      const profile = await getProfile(authData.user);
      setUser(profile);
      console.log('4. Profile created and User set. Login successful.');
      return { success: true, message: 'Login successful!' };
    } else {
      // If user created, but session not made (email verification pending)
      console.log('3. No Session (Email Verification Pending). Returning email check message.');
      return { success: true, message: 'Please check your email to confirm your account and log in.' };
    }
  };

  // 🛡️ NEW FUNCTION: Update Profile Details
  const updateProfile = async (data: { username?: string, ign?: string, freeFireId?: string, referralCode?: string }) => {
    if (!user) throw new Error("User not authenticated.");

    console.log("--- STARTING PROFILE UPDATE ---");

    const profileData: {
      username?: string;
      ign?: string;
      free_fire_id?: string; // DB column name
      referral_code?: string; // DB column name
    } = {};

    // Only include fields that are present in the data object
    if (data.username !== undefined) profileData.username = data.username;
    if (data.ign !== undefined) profileData.ign = data.ign;
    if (data.freeFireId !== undefined) profileData.free_fire_id = data.freeFireId;
    if (data.referralCode !== undefined) profileData.referral_code = data.referralCode;

    if (Object.keys(profileData).length === 0) {
        console.log("No data provided for profile update. Skipping DB call.");
        return; 
    }
    
    console.log("Updating data:", profileData);

    const { error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', user.id); 

    if (error) {
      console.error("CRITICAL UPDATE ERROR: Profile update failed.", error);
      throw error;
    }

    // Update local state (user) after successful DB update
    setUser(prev => prev ? {
      ...prev,
      username: data.username !== undefined ? data.username : prev.username,
      ign: data.ign !== undefined ? data.ign : prev.ign,
      freeFireId: data.freeFireId !== undefined ? data.freeFireId : prev.freeFireId,
      referralCode: data.referralCode !== undefined ? data.referralCode : prev.referralCode,
    } : null);
    
    console.log("--- PROFILE UPDATE SUCCESSFUL ---");
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, adminLogin, signup, logout, updateProfile }}>
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
