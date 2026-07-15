import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { signIn } from 'next-auth/react';
import { createUser } from './actions';

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
  userId: string,
  password: string,
  router: AppRouterInstance,
  setError: (error: string) => void
) => {
  const user = await createUser({name, userId, password});
  if (typeof user === 'string') {
    setError(user);
    return null;
  }
  handleLogin(userId, password, router, setError);
};
