// src/context/AuthContext.tsx
console.log("AuthContext LOADED - VERSION 2 - AGAR YEH DIKHE TOH NAYA CODE HAI");
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthUser, AuthContextType, LoginCredentials, SignupData } from '@/types';
import { supabase } from '@/lib/supabaseClient';
import { Session, User } from '@supabase/supabase-js';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Profile fetch karne ka function wahi rahega
  const getProfile = async (user: User): Promise<AuthUser | null> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('username, ign, free_fire_id, role, referral_code')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error("Error fetching profile:", error);
        return null; // Return null on error
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
      console.error('Error in getProfile:', e);
      return null;
    }
  };

  // ----- YEH useEffect UPDATE HUA HAI -----
  useEffect(() => {
    // Session ko pehli baar check karo
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        const profile = await getProfile(session.user);
        setUser(profile);
      }
      setIsLoading(false);
    });

    // Auth state change hone par suno
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          const profile = await getProfile(session.user);
          setUser(profile);
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    // Cleanup function
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // Login function wahi rahega
  const login = async (credentials: LoginCredentials) => {
    const { error } = await supabase.auth.signInWithPassword(credentials);
    if (error) throw error;
  };
  
  // Signup function wahi rahega
  const signup = async (data: SignupData) => {
    const { email, password, username, ign, freeFireId } = data;
    const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });
    if (authError) throw authError;
    if (!authData.user) throw new Error("Signup failed, user not created.");
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ username, ign, free_fire_id: freeFireId })
      .eq('id', authData.user.id);
    if (updateError) throw new Error(`Account created, but failed to save profile. Error: ${updateError.message}`);
    return { success: true, message: authData.session ? 'Signup successful!' : 'Please check your email to confirm!' };
  };

  // Admin Login wahi rahega
  const adminLogin = async (credentials: LoginCredentials) => {
    // ... aapka admin login code yahan
  };

  // Logout function wahi rahega
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
