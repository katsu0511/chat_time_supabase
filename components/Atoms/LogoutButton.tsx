'use client';

import { useState } from 'react';
import useAuth from '@/lib/hooks/useAuth';
import { handleLogout } from '@/lib/api/auth';

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const { router } = useAuth();

  const buttonClassName = loading ? 'bg-gray-400 cursor-progress' : 'bg-[color:var(--color-primary)] cursor-pointer hover:bg-white hover:text-[color:var(--color-primary)]';

  const logout = async () => {
    setLoading(true);
    const error = await handleLogout(router);
    if (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  return (
    <button
      disabled={loading}
      className={`block text-white h-10 w-25 duration-300 ${buttonClassName}`}
      onClick={() => logout()}
    >
      {loading ? 'Loading..' : 'Logout'}
    </button>
  );
}
