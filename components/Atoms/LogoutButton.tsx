'use client';

import useAuth from '@/lib/hooks/useAuth';
import { handleLogout } from '@/lib/api/auth';

export default function LogoutButton() {
  const { router } = useAuth();

  return (
    <button
      className='block bg-[color:var(--color-primary)] text-white h-10 w-20 duration-300 hover:bg-white hover:text-[color:var(--color-primary)] cursor-pointer'
      onClick={() => handleLogout(router)}
    >
      Logout
    </button>
  );
}
