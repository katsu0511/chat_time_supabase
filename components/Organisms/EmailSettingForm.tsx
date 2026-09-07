'use client';

import { useState, useEffect } from 'react';
import useLoading from '@/lib/hooks/useLoading';
import useAuth from '@/lib/hooks/useAuth';
import Heading from '@/components/Atoms/Heading';
import Input from '@/components/Molecules/Input';
import Button from '@/components/Molecules/Button';
import { handleLogout } from '@/lib/api/auth';
import PageLink from '@/components/Atoms/PageLink';
import Toast from '@/components/Molecules/Toast';

export default function EmailSettingForm({ user }: { user: AppUser }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [pendingData, setPendingData] = useState<string | null>(null);
  const { loading, setLoading } = useLoading();
  const { email, setEmail, error, setError, router } = useAuth();

  const preCheck = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (user.email === email) {
      setError('You don\'t change your email');
      setLoading(false);
      return;
    }

    setDialogOpen(true);
    setPendingData(email);
  };

  const changeEmail = async () => {
    setDialogOpen(false);

    if (!pendingData) {
      setError('Something went wrong');
      setLoading(false);
      return;
    }

    const res = await fetch('/api/changeEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: pendingData }),
    });

    if (res.ok) {
      setSnackbarOpen(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const error = await handleLogout();
      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }
      router.push('/');
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error);
      setPendingData(null);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setDialogOpen(false);
    setPendingData(null);
    setLoading(false);
  };

  useEffect(() => {
    setEmail(user.email);
  }, [user, setEmail]);

  return (
    <div className='flex items-center w-full h-full'>
      <form className='w-full' onSubmit={(e) => preCheck(e)}>
        <Heading title='Email Setting' />
        <Input label='Email' type='email' value={email} disabled={loading} onChange={(e) => setEmail(e.target.value)} />
        <Button usage='Change' error={error} disabled={loading} />
        <PageLink path='' display='Account Setting' />
        <PageLink path='password' display='Password Setting' />
        <PageLink path='..' display='Setting' />
      </form>
      <Toast type='email' dialogOpen={dialogOpen} snackbarOpen={snackbarOpen} setSnackbarOpen={setSnackbarOpen} handleCancel={handleCancel} changeAuthInfo={changeEmail} />
    </div>
  );
}
