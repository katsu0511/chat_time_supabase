'use client';

import { supabase } from '@/lib/infrastructure/supabaseBrowser';
import { Language } from '@/lib/domain/languages';

export const handleLogin = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { message: 'Failed to login' };
};

export const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) return { message: 'Failed to logout' };
};

export const handleSignup = async (name: string, email: string, language: Language, password: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error || !data.user) return { message: error?.message ?? 'Failed to signup' };

  const res = await fetch('/api/createUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, language }),
  });

  if (!res.ok) {
    const data = await res.json();
    return { message: data.error as string };
  }
};

export const checkPassword = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { message: 'Current password is wrong'};
};
