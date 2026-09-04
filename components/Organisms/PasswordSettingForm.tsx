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
  const { password, setPassword, passwordConfirm, setPasswordConfirm, error, setError, router } = useAuth();

  const preCheck = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error = await checkPassword(user.email, currentPassword);
    if (error) {
      setError('Current password is wrong');
      return;
    }
    if (password !== passwordConfirm) {
      setError('Password doesn\'t match');
      return;
    }
    if (currentPassword === password) {
      setError('You don\'t change your password');
      return;
    }
    setDialogOpen(true);
    setPendingData(passwordConfirm);
  };

  const changePassword = async () => {
    if (!pendingData) return;
    setDialogOpen(false);

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
    }

    setPendingData(null);
  };

  const handleCancel = () => {
    setDialogOpen(false);
    setPendingData(null);
  };

  return (
    <div className='flex items-center w-full h-full'>
      <form className='w-full' onSubmit={(e) => preCheck(e)}>
        <Heading title='Password Setting' />
        <Input label='Current Password' type='password' value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
        <Input label='New Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <Input label='Password Confirm' type='password' value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}/>
        <Button usage='Change' error={error} />
        <PageLink path='' display='Account Setting' />
        <PageLink path='email' display='Email Setting' />
        <PageLink path='..' display='Setting' />
      </form>
      <Toast type='password' dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} snackbarOpen={snackbarOpen} setSnackbarOpen={setSnackbarOpen} handleCancel={handleCancel} changeAuthInfo={changePassword} />
    </div>
  );
}
