'use client';

import { useState } from 'react';
import useLoading from '@/lib/hooks/useLoading';
import useAuth from '@/lib/hooks/useAuth';
import { handleLogin } from '@/lib/api/auth';
import Heading from '@/components/Atoms/Heading';
import Input from '@/components/Molecules/Input';
import Button from '@/components/Molecules/Button';
import PageLink from '@/components/Atoms/PageLink';
import Snackbar from '@/components/Atoms/SuccessSnackbar';

export default function LoginForm() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { loading, setLoading } = useLoading();
  const { email, setEmail, password, setPassword, error, setError, router } = useAuth();

  const login = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const error = await handleLogin(email, password);
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSnackbarOpen(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    router.push('/');
    router.refresh();
  };

  return (
    <div className='flex items-center w-full h-full'>
      <form className='w-full' onSubmit={login}>
        <Heading title='Login' />
        <Input label='Email' type='email' value={email} disabled={loading} onChange={(e) => setEmail(e.target.value)} />
        <Input label='Password' type='password' value={password} disabled={loading} onChange={(e) => setPassword(e.target.value)}/>
        <Button usage='Login' error={error} disabled={loading} />
        <PageLink path='signup' display='Signup' />
      </form>
      <Snackbar snackbarOpen={snackbarOpen} setSnackbarOpen={setSnackbarOpen} message='Successfully logged in' />
    </div>
  );
}
