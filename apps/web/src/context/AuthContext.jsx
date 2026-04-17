import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/firebase';

const ADMIN_EMAIL = 'analista.ericksilva@gmail.com';
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: 'https://studiologos.com.br' }
    });
    if (error) throw error;
  };

  const loginWithEmail = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  };

  const signUpWithEmail = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  };

  const resetPassword = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://studiologos.com.br'
    });
    if (error) throw error;
  };

  const isAdmin = user?.email === ADMIN_EMAIL;
  const isApproved = !!user;
  const userDoc = user ? {
    name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0],
    email: user.email,
    photoURL: user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
  } : null;

  return (
    <AuthContext.Provider value={{
      user,
      userDoc,
      loading,
      isAdmin,
      isApproved,
      logout,
      loginWithGoogle,
      loginWithEmail,
      signUpWithEmail,
      resetPassword,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
