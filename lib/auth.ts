import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { supabase } from '@/lib/supabaseBrowser';
import { createUser } from '@/lib/actions';

export const handleLogin = async (
  userId: string,
  password: string,
  router: AppRouterInstance,
  setError: (error: string) => void
) => {
  const res = await signIn('credentials', {
    redirect: false,
    userId,
    password,
  });

  if (res?.ok) router.push('/');
  else setError('Failed to login');
};

export const handleSignup = async (
  name: string,
  email: string,
  password: string,
  router: AppRouterInstance,
  setError: (error: string) => void
) => {
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
  });
  if (typeof user === 'string') {
    setError(user);
    return;
  }
  router.push('/');
};
