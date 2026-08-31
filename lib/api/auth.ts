import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { supabase } from '@/lib/infrastructure/supabaseBrowser';
import { Language } from '@/lib/domain/languages';
import { createUser } from '@/lib/api/actions';

export const handleLogin = async (
  email: string,
  password: string,
  router: AppRouterInstance,
  setError: (error: string) => void
) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Login error:', error.message);
    setError('Failed to login');
    return;
  }

  router.push('/');
};

export const handleSignup = async (
  name: string,
  email: string,
  language: Language,
  password: string,
  passwordConfirm: string,
  router: AppRouterInstance,
  setError: (error: string) => void
) => {
  if (password !== passwordConfirm) {
    setError('Password doesn\'t match');
    return;
  }

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error || !data.user) {
    console.error('Signup error:', error);
    setError(error?.message ?? 'Failed to signup');
    return;
  }

  const user = await createUser({
    id: data.user.id,
    name,
    email,
    language
  });

  if (typeof user === 'string') {
    setError(user);
    return;
  }

  router.push('/');
};
