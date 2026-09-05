'use client';

import { useState } from 'react';
import useAuth from '@/lib/hooks/useAuth';
import { checkPassword, handleLogout } from '@/lib/api/auth';
import Heading from '@/components/Atoms/Heading';
import Input from '@/components/Molecules/Input';
import Button from '@/components/Molecules/Button';
import PageLink from '@/components/Atoms/PageLink';
import Toast from '@/components/Molecules/Toast';

export default function PasswordSettingForm({ user }: { user: AppUser }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [pendingData, setPendingData] = useState<string | null>(null);
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { password, setPassword, passwordConfirm, setPasswordConfirm, error, setError, router } = useAuth();

  const preCheck = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const error = await checkPassword(user.email, currentPassword);
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (password !== passwordConfirm) {
      setError('Password doesn\'t match');
      setLoading(false);
      return;
    }

    if (currentPassword === password) {
      setError('You don\'t change your password');
      setLoading(false);
      return;
    }

    setDialogOpen(true);
    setPendingData(passwordConfirm);
  };

  const changePassword = async () => {
    setDialogOpen(false);

    if (!pendingData) {
      setError('Something went wrong');
      setLoading(false);
      return;
    }

    const res = await fetch('/api/changePassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: pendingData }),
    });

    if (res.ok) {
      setSnackbarOpen(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await handleLogout(router);
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

  return (
    <div className='flex items-center w-full h-full'>
      <form className='w-full' onSubmit={(e) => preCheck(e)}>
        <Heading title='Password Setting' />
        <Input label='Current Password' type='password' value={currentPassword} disabled={loading} onChange={(e) => setCurrentPassword(e.target.value)} />
        <Input label='New Password' type='password' value={password} disabled={loading} onChange={(e) => setPassword(e.target.value)} />
        <Input label='Password Confirm' type='password' value={passwordConfirm} disabled={loading} onChange={(e) => setPasswordConfirm(e.target.value)}/>
        <Button usage='Change' error={error} disabled={loading} />
        <PageLink path='' display='Account Setting' disabled={loading} />
        <PageLink path='email' display='Email Setting' disabled={loading} />
        <PageLink path='..' display='Setting' disabled={loading} />
      </form>
      <Toast type='password' dialogOpen={dialogOpen} snackbarOpen={snackbarOpen} setSnackbarOpen={setSnackbarOpen} handleCancel={handleCancel} changeAuthInfo={changePassword} />
    </div>
  );
}
