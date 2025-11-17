// src/context/AuthContext.tsx

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthUser, AuthContextType, LoginCredentials, SignupData } from '@/types';
import { supabase } from '@/lib/supabaseClient';
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
        .select('username, ign, free_fire_id, role, referral_code')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }
      
      return {
        id: user.id,
        email: user.email || '',
        username: data.username,
        ign: data.ign,
        freeFireId: data.free_fire_id,
        role: data.role || 'user',
        referralCode: data.referral_code || '',
        createdAt: user.created_at,
      };

    } catch (e) {
      console.error('Error in getProfile:', e);
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

    return () => {
      authListener?.subscription.unsubscribe();
    };
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

  // ----- YEH HAI FINAL CORRECT SIGNUP FUNCTION -----
  const signup = async (data: SignupData) => {
    const { email, password, username, ign, freeFireId } = data;

    // Sign up the user with metadata, which our trigger will use.
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username,
          ign: ign,
          free_fire_id: freeFireId
        }
      }
    });

    if (error) {
      throw error;
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
