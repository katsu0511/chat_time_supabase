'use client';

import { useState } from 'react';
import useLoading from '@/lib/hooks/useLoading';
import useAuth from '@/lib/hooks/useAuth';
import { handleLogout } from '@/lib/api/auth';
import Snackbar from '@/components/Atoms/SuccessSnackbar';

export default function LogoutButton() {
  const [hasClicked, setHasClicked] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { loading, setLoading } = useLoading();
  const { router } = useAuth();

  const buttonClassName = hasClicked ? 'bg-gray-400 cursor-progress' : loading ? 'bg-[color:var(--color-primary)] cursor-not-allowed' : 'bg-[color:var(--color-primary)] cursor-pointer hover:bg-white hover:text-[color:var(--color-primary)]';

  const logout = async () => {
    setLoading(true);
    setHasClicked(true);

    const error = await handleLogout();
    if (error) {
      alert(error.message);
      setLoading(false);
      setHasClicked(false);
      return;
    }

    setSnackbarOpen(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    router.push('/');
    router.refresh();
  };

  return (
    <>
      <button
        disabled={loading}
        className={`block text-white h-10 w-25 duration-300 ${buttonClassName}`}
        onClick={logout}
      >
        {hasClicked ? 'Loading..' : 'Logout'}
      </button>
      <Snackbar snackbarOpen={snackbarOpen} setSnackbarOpen={setSnackbarOpen} message='Successfully logged out' />
    </>
  );
}
