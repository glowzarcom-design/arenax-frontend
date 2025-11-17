// src/context/AuthContext.tsx

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthUser, AuthContextType, LoginCredentials, SignupData } from '@/types';
import { supabase } from '@/lib/supabaseClient'; // <-- SUPABASE CLIENT IMPORT KIYA
import { Session, User } from '@supabase/supabase-js';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to get user profile from our 'profiles' table
  const getProfile = async (user: User): Promise<AuthUser | null> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('username, ign, free_fire_id')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }
      
      // Combine Supabase auth data with our profile data
      return {
        id: user.id,
        email: user.email || '',
        username: data.username,
        ign: data.ign,
        freeFireId: data.free_fire_id,
        role: user.role === 'authenticated' ? 'user' : 'user', // Default role for now
        referralCode: '', // We can add this later
        createdAt: user.created_at,
      };

    } catch (e) {
      console.error('Error in getProfile:', e);
      return null;
    }
  };


  useEffect(() => {
    // Check for active session on initial load
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const profile = await getProfile(session.user);
        setUser(profile);
      }
      setIsLoading(false);
    };

    checkUser();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const profile = await getProfile(session.user);
        setUser(profile);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const { error } = await supabase.auth.signInWithPassword(credentials);
    if (error) throw error;
  };

  const adminLogin = async (credentials: LoginCredentials) => {
    // We will keep this as-is for now, and can connect to Supabase roles later.
    const ADMIN_EMAIL = 'ashadislam333@gmail.com';
    const ADMIN_PASS = 'mohammadashad00';

    if (credentials.email === ADMIN_EMAIL && credentials.password === ADMIN_PASS) {
      // This is a mock login, it doesn't create a real session.
      // For a real app, admin would also be a Supabase user with a special role.
       const mockAdminUser: AuthUser = {
        id: 'admin-001',
        username: 'Ashad Islam',
        email: 'ashadislam333@gmail.com',
        ign: 'AdminIGN',
        freeFireId: 'ADMIN123',
        role: 'admin',
        referralCode: 'ADMINREF',
        createdAt: new Date().toISOString(),
      };
      setUser(mockAdminUser);
    } else {
      throw new Error('Invalid Admin Credentials');
    }
  };

  const signup = async (data: SignupData) => {
    const { email, password, username, ign, freeFireId } = data;

    // Step 1: Sign up the user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error("Signup successful, but no user data returned.");

    // Step 2: Insert the additional info into our 'profiles' table
    const { error: profileError } = await supabase.from('profiles').insert({
      id: authData.user.id,
      username,
      ign,
      free_fire_id: freeFireId,
    });

    if (profileError) {
      console.error("Error creating profile, but user was created. Please contact support.", profileError);
      throw profileError;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        adminLogin,
        signup,
        logout,
      }}
    >
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